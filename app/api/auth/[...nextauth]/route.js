import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { connectToDB } from '@/utils/database';
import { connectMongoClient } from '@/utils/connectMongoClient';
import User from '@/models/user';
import EmailProvider from 'next-auth/providers/email';

console.log({
	clientId: process.env.GOOGLE_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

const handler = NextAuth({
	trustHost: true,
	adapter: MongoDBAdapter(connectMongoClient),
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 Days in seconds (This is nextAuth default)
	},
	pages: {
		signIn: '/auth/sign-in',
	},
	providers: [
		EmailProvider({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: process.env.EMAIL_SERVER_PORT,
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			allowDangerousEmailAccountLinking: true,
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				return {
					...token,
					id: user.id,
				};
			}
			return token;
		},
		async session({ session }) {
			const sessionUser = await User.findOne({
				email: session.user.email,
			});

			session.user.id = sessionUser._id.toString();

			return session;
		},
		async signIn({ profile, user }) {
			const email = profile ? profile.email : user.email;

			try {
				await connectToDB();

				// Check if a user already exists
				const userExists = await User.findOne({
					email: email,
				});

				// If not, create new user and save to database
				if (!userExists) {
					await User.create({
						email: email,
						name: profile?.name ? profile?.name : email,
						image: profile?.picture,
					});
				}

				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };
