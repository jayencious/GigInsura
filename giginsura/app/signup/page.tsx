"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
import Link from "next/link";

export default function SignUpPage() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignUp = async (formData: FormData) => {
        setLoading(true);
        setError(null);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const name = formData.get("name") as string;
        const phone = formData.get("phone") as string;
        const upi_id = formData.get("upi_id") as string;
        const delivery_zone = formData.get("delivery_zone") as string;

        const { data, error: authError } = await supabase.auth.signUp(
            { email, password }
        );

        if (authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }

        if (data.user) {
            const randomGigId = `GIG-${Math.floor(100000 + Math.random() * 900000)}`;

            const { error: dbError } = await supabase
                .from("users")
                .insert([
                    {
                        id: data.user.id,
                        name: name,
                        phone: phone,
                        upi_id: upi_id,
                        delivery_zone: delivery_zone,
                        platform_id: randomGigId,
                        baseline_risk_score: 1.0,
                        role: "rider"
                    }
                ]);

            if (dbError) {
                console.error("Profile cretion failed: ", dbError);
                setError("DB Error: Could not save profile details.");
                setLoading(false);
                return;
            }

            router.push("/dashboard");
        }
    };

    return (
        <div
            className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
        >
            <div
                className="sm:mx-auto sm:w-full sm:max-w-md"
            >
                <h2
                    className="mt-6 text-center text-3xl font-extrabold text-gray-900"
                >
                    Rider Registration
                </h2>
                <p
                    className="mt-2 text-center text-sm text-gray-600"
                >
                    Join GigInsura Protection Network
                </p>
            </div>

            <div
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl"
            >
                <div
                    className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
                >
                    <form
                        className="space-y-5"
                    >
                        <div
                            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                        >
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="John Doe"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    placeholder="+91 9876543210"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                className="block text-sm font-medium text-gray-700"
                            >
                                UPI ID (For Payouts)
                            </label>
                            <input
                                type="text"
                                name="upi_id"
                                required
                                placeholder="rider@okbank"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label
                                className="block text-sm font-medium text-gray-700"
                            >
                                Primary Delivery Zone
                            </label>
                            <select
                                name="delivery_zone"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                            >
                                <option value="Koramangala">Koramangala</option>
                                <option value="Indiranagar">Indiranagar</option>
                                <option value="Whitefield">Whitefield</option>
                                <option value="HSR Layout">HSR Layout</option>
                            </select>
                        </div>

                        <div
                            className="relative my-4"
                        >
                            <div
                                className="absolute inset-0 flex items-center"
                            >
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                        </div>

                        <div>
                            <label
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {error &&
                            <p
                                className="text-red-600 text-sm font-medium text-center bg-red-50 py-2 rounded"
                            >
                                {error}
                            </p>
                        }

                        <div
                            className="pt-2"
                        >
                            <button
                                formAction={handleSignUp}
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors"
                            >
                                {loading ? "Registering..." : "Complete Registration"}
                            </button>
                        </div>

                        <div
                            className="text-center mt-4"
                        >
                            <Link
                                href={"/login"}
                                className="text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                                Already have an account? Sign in here.
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};