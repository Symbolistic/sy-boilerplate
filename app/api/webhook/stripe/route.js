import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { connectToDB } from '@/utils/database';
import { plans } from '@/utils/plans';
import User from '@/models/user';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
    await connectToDB();

    const body = await req.text();

    const signature = headers().get('stripe-signature');

    let data;
    let eventType;
    let event;

    // Verify Stripe event is real
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
        console.error(`Webhook signature verifiation failed. ${error.message}`);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    data = event.data;
    eventType = event.type;

    try {
        switch (eventType) {
            case 'checkout.session.completed': {
                // First payment is successful and a subscription is created
                const session = await stripe.checkout.sessions.retrieve(
                    data.object.id,
                    {
                        expand: ['line_items'],
                    }
                );

                const customerId = session?.customer;
                const customer = await stripe.customers.retrieve(customerId);

                const priceId = session?.line_items?.data[0]?.price.id;
                const plan = plans.find((plan) => plan.priceId === priceId);

                if (!plan) {
                    console.error(`No plan found for priceId: ${priceId}`);
                    throw new Error('Plan not found');
                }

                let user;

                if (customer.email) {
                    user = await User.findOne({ email: customer.email });

                    if (!user) {
                        user = await User.create({
                            email: customer.email,
                            name: customer.name,
                        });
                        await user.save();
                    }
                } else {
                    console.error('No user found');
                    throw new Error('No user found');
                }

                // Update user data + Grant user access to your product.
                user.priceId = priceId;
                user.hasAccess = true;
                user.customerId = customerId;
                await user.save();

                // EXTRA (Future Update) - Send welcome email with login link

                break;
            }

            case 'customer.subscription.deleted': {
                // Revoke access to the product/services
                // The customer may have changed the plan (higher or lower plan, cancel soon, etc...)
                const subscription = await stripe.subscriptions.retrieve(
                    data.object.id
                );

                const user = await User.findOne({
                    customerId: subscription.customer,
                });

                // Revoke access to your product
                user.hasAccess = false;
                await user.save();

                break;
            }

            // case 'checkout.session.expired': {
            // }

            // case 'customer.subscription.updated': {
            // }

            // case 'invoice.paid': {
            // }

            default:
            // Unhandled event type
        }
    } catch (error) {
        console.error(
            'Stripe error: ' + error.message + ' | EVENT TYPE: ' + eventType
        );
    }

    return NextResponse.json({});
}
