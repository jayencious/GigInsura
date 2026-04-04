# GigInsura: Next.js Frontend Client

> A next-generation, AI-driven parametric insurance platform built for India's gig economy.

GigInsura calculates dynamic insurance premiums in real-time by analyzing live atmospheric telemetry, protecting delivery riders from extreme weather disruptions while offering automated, smart-contract-style payouts.

This reposity contains the **Next.js Frontend Client**, which serves as both the Rider Dashboard and the God-Mode Admin Control Panel.

## Core Features

* **Zero-Trust Security Architecture:** Powered by Supabase Auth with srict Row Level Security (RLS) and JSON Web Token (JWT) verification.
* **Role-Based Access Control (RBAC):** Cryptographically isolated routing that automatically directs standard users to the Rider Dashboard and verified administrators to the GigInsura's Overlord Panel.
* **Live Telemetry Visualization:** Connects to our Python AI Engine to fetch and display real-time OpenWeatherMap API data directly in the UI.
* **Dynamic Risk Decomposition:** Uses `Recharts` to visually prove the AI engine's math, breaking down how severe weather elements map to the exact premium price hikes.
* **God-Mode Admin Webhooks:** A restricted terminal interface that allows administrators to inject weather anomalies, ping fraud engines and simulate automated mass payouts.
* **Cinematic UI/UX:** Built with React 19 and Tailwind CSS, featuring buttery-smooth layout transitions and micro-interactions powered by `framer-motion`.

## Tech Stack

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Library:** [React 19](https://react.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Authentication & DB:** [Supabase](https://supabase.com/)
* **Data Visualization:** [Recharts](https://recharts.org/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)

## Getting Started (Locally)

To run this frontend locally, you wil aslo need the **GigInsura Python AI Engine** running concurrently on `localhost:8000`.

### 1. Install Dependencies
Navigate to this frontend directory and install the required NPM packages:
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root of this Next.js project and add your Supabase credentials. **Never commit this file to version control**.
```bash
NEXT_PUBLIC_SUPABASE_URL="[https://your-project.supabase.co](https://your-project.supabase.co)"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-long-anon-key-here"
```

### 3. Spin Up the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure Highlights

* `app/login/page.tsx`: Smart authentication router that handles Supabase sign-ins, database user creation and RBAC redirects.
* `app/dashboard/page.tsx`: The primary interface for gig workers to view live weather telemetry and secure their dynamic weekly premiums.
* `app/admin/page.tsx`: The restricted Overlord Control Panel for executing server-side simulation webhooks.
* `app/api/admin/action/route.ts`: Secure Next.js API route that validates JWTs before executing admin commands.

## Architecture Note
This frontend relies on the `GigInsura Python API` to calculate the mathematical risk models. Ensure that the Python FastAPI server is running. If the Python server is offline, the Next.js UI will gracefully fall back to a safe "Awaiting API" state without crashing.