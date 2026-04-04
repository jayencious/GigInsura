"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  CloudLightning,
  ArrowRight,
  Server
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Home() {
  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-50 font-sans overflow-hidden"
    >
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      {/* Navigation */}
      <nav
        className="relative z-10 flex justify-between items-center p-6 lg:px-12 border-b border-white/10"
      >
        <div
          className="flex items-center gap-2 text-xl font-black tracking-wider bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"
        >
          <ShieldCheck size={28} className="text-emerald-400" />
          GigInsura
        </div>
        <div
          className="flex gap-4 text-sm font-medium"
        >
          <Link
            href={"/login"}
            className="text-slate-300 hover:text-white transition px-4 py-2"
          >
            Rider Login
          </Link>
          <Link
            href={"/admin"}
            className="text-emerald-400 hover:text-emerald-300 transition flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 rounded-lg"
          >
            <Server size={16} /> Admin Node
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main
        className="relative z-10 max-w-6xl mx-auto px-6 pt-24 lg:pt-32 pb-16 flex flex-col items-center text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-8 max-w-4xl"
        >

          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium"
          >
            <Zap size={16} /> Powered by Live OpenWeather Telemetry
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl lg:text-7xl font-black tracking-tight leading-tight"
          >
            Parametric Protection for the <br />
            <span
              className="bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent"
            >
              Gig Economy.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            No claims adjusters. No 30-day waiting periods. Our AI-powered GigInsura engine monitors real-time environmental hazards and instantly wires funds to riders the second disaster strikes.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8"
          >
            <Link
              href={"/login"}
            >
              <button
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                Get Protected <ArrowRight size={20} />
              </button>
            </Link>
            <Link
              href={"/admin"}
            >
              <button
                className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors border border-slate-700 flex items-center justify-center gap-2"
              >
                Simulate Disaster <CloudLightning size={20} />
              </button>
            </Link>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
};