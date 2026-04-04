"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

export default function LoginPage() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignIn = async(formData: FormData) => {
        setLoading(true);
        setError(null);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const { data: authData, error: authError } = await supabase.auth.signInWithPassword(
            { email, password }
        );

        if(authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }

        if(authData.user) {
            const { data: profile, error: dbError } = await supabase
                .from("users")
                .select("role")
                .eq("id", authData.user.id)
                .maybeSingle();
            
            if(dbError) console.error("Failed to fetch role:", dbError);

            if(profile?.role === "admin") router.push("/admin");
            else router.push("/dashboard");
        }
    };

    const handleSignUp = async(formData: FormData) => {
        setLoading(true);
        setError(null);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const { data, error: authError } = await supabase.auth.signUp(
            { email, password }
        );

        if(authError) {
            setError(authError.message);
            setLoading(false);

            return;
        }

        if(data.user) {
            const randomGigId = `GIG-${Math.floor(100000 + Math.random() * 900000)}`;

            const { error: dbError } = await supabase
                .from("users")
                .insert([
                    {
                        id: data.user.id,
                        name: email.split('@')[0],
                        platform_id: randomGigId,
                        delivery_zone: "Koramangala",
                        baseline_risk_score: 1.0,
                        role: "rider"
                    }
                ]);
            
            if(dbError) console.error("Profile creation failed: ", dbError);

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
                    GigInsura Access
                </h2>
            </div>

            <div
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
            >
                <div
                    className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
                >
                    <form
                        className="space-y-6"
                    >
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {error &&
                            <p
                                className="text-red-600 text-sm font-medium"
                            >
                                {error}
                            </p>
                        }

                        <div
                            className="flex gap-4"
                        >
                            <button
                                formAction={handleSignIn}
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                            >
                                Sign In
                            </button>

                            <button
                                formAction={handleSignUp}
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};