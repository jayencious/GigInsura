"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldCheck,
    MapPin,
    CloudLightning,
    Activity,
    AlertTriangle,
    LogOut
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

interface RiskFactor {
    disruption_type: string;
    probability: number;
    severity_weight: number;
};

interface PremiumData {
    delivery_zone: string;
    base_premium: number;
    calculated_weekly_premium_inr: number;
    live_telemetry: string;
    risk_factors_applied: RiskFactor[];
};

interface UserProfile {
    id: string;
    name: string;
    delivery_zone: string;
    baseline_risk_score: number;
    platform_id: string;
};


export default function Dashboard() {
    const router = useRouter();
    const supabase = createClient();

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [premiumData, setPremiumData] = useState<PremiumData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isActivating, setIsActivating] = useState(false);
    const [isProtected, setIsProtected] = useState(false);

    useEffect(
        () => {
            const initializeDashboard = async() => {
                try {
                    const { data: { session }, error: authError } = await supabase.auth.getSession();

                    if(authError || !session) {
                        router.push("/login");
                        return;
                    }

                    const { data: profile, error: dbError } = await supabase
                        .from("users")
                        .select("delivery_zone, baseline_risk_score")
                        .eq("id", session.user.id)
                        .single();
                    
                    if(dbError) throw dbError;

                    const actualZone = profile.delivery_zone || "Koramangala";
                    const actualRisk = profile.baseline_risk_score || 1.0;

                    setZone(actualZone);

                    const res = await fetch("https://giginsura-engine.onrender.com/api/premium", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(
                            {
                                delivery_zone: actualZone,
                                baseline_risk_score: actualRisk
                            }
                        )
                    });

                    if(!res.ok) throw new Error("Failed to fetch Premium");

                    const engineData = await res.json();
                } catch (err) {
                    console.error("Dashboard Initialization Failed:", err);
                }
            };

            initializeDashboard();
        }, [router, supabase]
    );

    const activatePolicy = async () => {
        setIsActivating(true);

        setTimeout(
            () => {
                setIsProtected(true);
                setIsActivating(false);
            }, 2000
        );
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    if (loading) {
        return (
            <div
                className="min-h-screen bg-slate-900 flex items-center justify-center"
            >
                <motion.div
                    animate={
                        { scale: [1, 1.2, 1], rotate: [0, 180, 360] }
                    }
                    transition={
                        { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }
                    className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    const chartData = premiumData?.risk_factors_applied?.map(
        (f) => (
            {
                name: f.disruption_type.replace('_', ' '),
                Risk: Number((f.probability * f.severity_weight * 100).toFixed(0)),
                probability: f.probability,
                fill: (f.probability > 0.6) ? "#ef4444" : "#3b82f6"
            }
        )
    ) || [];

    return (
        <div
            className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans"
        >
            <div
                className="max-w-5xl mx-auto space-y-6"
            >
                {/* Header Section */}
                <div
                    className="flex justify-between items-center bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl"
                >
                    <div>
                        <h1
                            className="text-3xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"
                        >
                            GigInsura Command
                        </h1>
                        <p
                            className="text-slate-400 mt-1"
                        >
                            Welcome back, <span className="text-white font-medium">{profile?.name}</span>
                        </p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-colors"
                    >
                        <LogOut size={20} /> <span className="hidden md:inline font-medium">Sign Out</span>
                    </button>
                </div>

                <div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                    {/* Left Column: Core Status & Pricing */}
                    <div
                        className="lg:col-span-1 space-y-6"
                    >
                        {/* Telemetry Card */}
                        <div
                            className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-lg relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                            <h3
                                className="text-slate-400 font-semibold mb-4 flex items-center gap-2"
                            >
                                <MapPin size={10} className="text-blue-400" /> Live Telemetry
                            </h3>
                            <div
                                className="space-y-3 relative z-10"
                            >
                                <div
                                    className="flex justify-between items-center border-b border-slate-700 pb-2"
                                >
                                    <span className="text-sm text-slate-400">Zone</span>
                                    <span className="font-bold text-white">{profile?.delivery_zone}</span>
                                </div>
                                <div
                                    className="flex justify-between items-center"
                                >
                                    <span className="text-sm text-slate-400">Atmosphere</span>
                                    <span className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
                                        <CloudLightning size={16} /> {premiumData?.live_telemetry || "Awaiting API"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Premium Card */}
                        <div
                            className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-6 border border-blue-700 shadow-2xl relative overflow-hidden"
                        >
                            <Activity className="absolute -bottom-4 -right-4 w-32 h-32 text-white opacity-5" />
                            <h2
                                className="text-blue-200 font-medium mb-2"
                            >
                                Dynamic Weekly Premium
                            </h2>
                            <div
                                className="flex items-baseline gap-2"
                            >
                                <span className="text-5xl font-black text-white">₹{premiumData?.calculated_weekly_premium_inr || "0.00"}</span>
                                <span className="text-blue-300">/ week</span>
                            </div>

                            <AnimatePresence
                                mode="wait"
                            >
                                {!isProtected ? (
                                    <motion.button
                                        key="pay-btn"
                                        initial={
                                            { opacity: 0 }
                                        }
                                        animate={
                                            { opacity: 1 }
                                        }
                                        exit={
                                            { opacity: 0 }
                                        }
                                        onClick={activatePolicy}
                                        disabled={isActivating || !premiumData}
                                        className="mt-6 w-full bg-white text-blue-900 font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all flex justify-center items-center gap-2 disabled:opacity-75"
                                    >
                                        {isActivating ? (
                                            <span
                                                className="flex items-center gap-2"
                                            >
                                                <motion.div
                                                    animate={
                                                        { rotate: 360 }
                                                    }
                                                    transition={
                                                        { repeat: Infinity, duration: 1 }
                                                    }
                                                    className="w-5 h-5 border-2 border-blue-900 border-t-transparent rounded-full"
                                                />
                                                Securing Ledger...
                                            </span>
                                        ) : (
                                            <>Activate Protection <ShieldCheck size={20} /></>
                                        )}
                                    </motion.button>
                                ) : (
                                    <motion.div
                                        key="success-badge"
                                        initial={
                                            { scale: 0.8, opacity: 0 }
                                        }
                                        animate={
                                            { scale: 1, opacity: 1 }
                                        }
                                        className="mt-6 w-full bg-emerald-500/20 border border-emerald-500 text-emerald-300 font-bold py-4 rounded-xl flex justify-center items-center gap-2"
                                    >
                                        <ShieldCheck size={24} /> Coverage Active
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Column: Analytics */}
                    <div
                        className="lg:col-span-2 space-y-6"
                    >
                        <div
                            className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-lg h-full flex flex-col"
                        >
                            <div
                                className="flex items-center justify-between mb-6"
                            >
                                <h3
                                    className="text-lg font-bold text-white flex items-center gap-2"
                                >
                                    <AlertTriangle size={20} className="text-amber-400" /> Risk Decomposition
                                </h3>
                                <span className="text-xs font-mono bg-slate-700 text-slate-300 py-1 px-3 rounded-full">v2 Engine</span>
                            </div>

                            <p
                                className="text-sm text-slate-400 mb-6"
                            >
                                Your premium is dynamically priced based on the following real-time environmental hazards affecting {profile?.delivery_zone}.
                            </p>

                            {/* Recharts Data Visualization */}
                            <div
                                className="w-full h-75 min-h-75 mt-4 relative"
                            >
                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >
                                    <BarChart
                                        data={chartData}
                                        margin={
                                            { top: 10, right: 10, left: -20, bottom: 0 }
                                        }
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#334155"
                                            vertical={false}
                                        />
                                        <XAxis
                                            dataKey="name"
                                            stroke="#94a3b8"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#94a3b8"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip
                                            cursor={
                                                { fill: "#1e293b" }
                                            }
                                            contentStyle={
                                                { backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#fff" }
                                            }
                                            formatter={(value: number | string | readonly (number | string)[] | undefined) => [`${value || 0} Impact Score`, `Risk Severity`]}
                                        />
                                        <Bar
                                            dataKey={"Risk"}
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};