"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterRider() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState(
        {
            name: "",
            platform_id: "",
            phone: "",
            delivery_zone: "Koramangala",  // Default dropdown value for delivery_zone
            upi_id: ""
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to register");

            setMessage("Registration successful! Redirecting to dashboard...");

            setTimeout(
                () => {
                    router.push("/dashboard");
                }, 2000
            );
        } catch (err: unknown) {
            const errorMsg = err instanceof Error
                ? err.message
                : "An unknown error occurred during registration.";
            
            setMessage(`Error: ${errorMsg}`);
        } finally {
            setLoading(false);
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
                    GigInsura Onboarding
                </h2>
                <p
                    className="mt-2 text-center text-sm text-gray-600"
                >
                    Activate your automated income safety net.
                </p>
            </div>

            <div
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
            >
                <div
                    className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
                >
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                onChange={handleChange}
                                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="platform_id"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Platform ID (Zepto/Blinkit)
                            </label>
                            <input
                                type="text"
                                id="platform_id"
                                name="platform_id"
                                required
                                onChange={handleChange}
                                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                onChange={handleChange}
                                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="delivery_zone"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Delivery Zone
                            </label>
                            <select
                                id="delivery_zone"
                                name="delivery_zone"
                                onChange={handleChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-gray-700 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                                <option value="Koramangala">Koramangala</option>
                                <option value="Indiranagar">Indiranagar</option>
                                <option value="Whitefield">Whitefield</option>
                                <option value="HSR Layout">HSR Layout</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="upi_id"
                                className="block text-sm font-medium text-gray-700"
                            >
                                UPI ID (For Payouts)
                            </label>
                            <input
                                type="text"
                                id="upi_id"
                                name="upi_id"
                                required
                                onChange={handleChange}
                                placeholder="example-upi@okhdfcbank"
                                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {loading ? "Activating Profile..." : "Complete Onboarding"}
                            </button>
                        </div>

                        {message && (
                            <p
                                className={`text-center text-sm font-medium mt-4 ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}
                            >
                                {message}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};