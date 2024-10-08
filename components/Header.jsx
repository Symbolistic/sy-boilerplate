'use client';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Header = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);

    // Customer Portal Link
    const customerPortalLink =
        'https://billing.stripe.com/p/login/test_6oEaF83vQ7VY1Z69AA';

    useEffect(() => {
        const setupProviders = async () => {
            const response = await getProviders();

            setProviders(() => {
                const listProviders = Object.values(response);

                return {
                    email: listProviders[0],
                    google: listProviders[1],
                };
            });
        };

        setupProviders();
    }, []);

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <a href="#Pricing">Pricing</a>
                        </li>
                        <li>
                            <a href="#FAQ">FAQ</a>
                        </li>
                        <li>
                            <a>Contact</a>
                        </li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl" href="/">
                    Site Name Here
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <a href="#Pricing">Pricing</a>
                    </li>
                    <li>
                        <a href="#FAQ">FAQ</a>
                    </li>
                    <li>
                        <a>Contact</a>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                {session?.user ? (
                    <div className="dropdown dropdown-end">
                        <button
                            tabIndex={0}
                            className="btn btn-circle"
                            type="button"
                        >
                            {session?.user?.name
                                ? session?.user?.name[0].toUpperCase()
                                : 'U'}
                        </button>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <a
                                    href={
                                        customerPortalLink +
                                        '?prefilled_email=' +
                                        session?.user?.email
                                    }
                                >
                                    Manage Subscription
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() =>
                                        signOut({ callbackUrl: '/' })
                                    }
                                >
                                    Sign Out
                                </a>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => router.push('/auth/sign-in')}
                    >
                        Get Started
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
