'use client';

import { FcGoogle } from 'react-icons/fc';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const SignIn = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [email, setEmail] = useState('');
    const [inputError, setInputError] = useState(false);

    useEffect(() => {
        const setupProviders = async () => {
            const response = await getProviders();
            const test = '';

            setProviders(() => {
                const listProviders = Object.values(response);

                return {
                    email: listProviders[0],
                    google: listProviders[1],
                };
            });
        };

        setupProviders();

        // Sync email state with the pre-filled input value
        const inputElement = document.querySelector('input[name="email"]');
        if (inputElement && inputElement.value) {
            setEmail(inputElement.value);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email) {
            setInputError(true);
            return;
        }

        try {
            await signIn(providers.email.id, { email, callbackUrl: '/' });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="card w-full max-w-xs p-6 bg-white border border-black rounded-lg">
                <h2 className="text-center mt-5 mb-5">Sign In</h2>
                <div className="flex flex-col gap-3 items-center">
                    <form
                        className="flex flex-col gap-2"
                        onSubmit={handleSubmit}
                    >
                        <label
                            className={`input input-bordered input-sm flex items-center gap-2 ${
                                inputError === true
                                    ? 'border-2 border-rose-600'
                                    : ''
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70"
                            >
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input
                                type="email"
                                name="email"
                                className="grow"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <button
                            className="btn btn-primary btn-wide"
                            type="submit"
                            disabled={providers === null}
                        >
                            Get Started
                        </button>
                    </form>
                    <div className="divider">or</div>
                    <button
                        className="btn btn-wide"
                        onClick={() =>
                            signIn(providers.google.id, {
                                callbackUrl: '/',
                            })
                        }
                        disabled={providers === null}
                    >
                        <FcGoogle />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
