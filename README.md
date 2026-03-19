# GigInsura

## Team Members:
1. JOEL ROBERT LAKRA
2. VAIBHAV VERMA
3. SANJIT MATHUR
4. REEYA SEJWAL
5. SUMIT KUMAR MISHRA

## Project Overview
- India's platform-based delivery partners which include those who work for platforms like Blinkit, Zepto, Swiggy Instamart, etc., are the backbone of our country's fast-paced digital economy.
- However, the external disruptions like, extreme weather conditions, pollution and natural disasters can reduce their work hours and can cause them to lose about 20-30% of their monthly earnings.
- As of now, these gig workers do not have any income protection against these unexpected and uncontrollable events so, we need a solution for this problem.

- **GigInsura** is an AI-powered parametric insurance platform for Q-commerce gig workers to safeguard them from the income losses that are caused by extreme weather conditions and other external disruptions.
- Our solution provides automated coverage and payouts, it also incorporates intelligent fraud detection mechanisms and procedures and operates on a simple weekly pricing model that is aligned with the typical earnings cycle of the gig workers.
- We strictly exclude any coverage for health, life, accidents or vehicle repairs.

## 1. Target Persona and Scenario
**Persona:** Grocery/Q-Commerce Delivery Partners (e.g., Blinkit, Zepto, Swiggy Instamart, etc).

**Scenario:**
- A Q-Commerce delivery partner operates within a tight 2-3 km radius.
- A sudden and severe pre-monsoon heavy rainfall floods the main roads in their zone which results in extreme heavy rain and floods.
- As a result, the deliveries are halted by such platforms for about 3-5 hours.
- Now, let's see the scenario:
* Without GigInsura: The partner needs to bear the full financial loss without any safety net.
* With GigInsura: Our system detects heavy rainfall triggers and the platform halts by using an API (Application Programming Interface). An automatic claim initiatino occurs for the identified disruptions to ensure an instant payout to be processed for the lost income.

## 2. Core Solution and Workflow
The workflow details a seamless experience for the application:

1. **Optimized Onboarding:** A registration process that is tailored for the delivery persona without any obstruction.
2. **Risk Profiling:** AI analysis of the rider's historical zone data in order to generate a baseline risk score by using relevant AIML techniques.
3. **Active Coverage:** The rider needs to pay a weekly micro-premium in order to activate the policy coverage.
4. **Continuous Monitoring:** The platform performs a real-time trigger monitoring by using the weather APIs and real-time traffic data.
5. **Parametric Automation:** If a disruption parameter is met then a zero-touch claim process is triggered by issuing a payout that is exclusively for the lost income.

## 3. The Financial Model
The financial model works on weely pricing.

The gig workers operate week-to-week, so the financial model must be structured on a weekly basis.

- Dynamic Premium Calculation: The premium must be structures as a Weekly pricing model.
- AI-Adjusted Pricing: By utilizing the predictive risk modeling that is specific to the persona, the premium dynamically shifts. The system also utilizes Machine Learning in order to adjust the weekly premium based on the hyper-local risk factors.

## 4. Parametric Triggers
These parametric triggers are for the loss of income only.

Our triggers are purely data-driven which cover the core disruptions that are to be addressed:
* Environmental (Flooding/Extreme Rain): This is triggered when the local weather APIs register rainfall that exceeds the critical thresholds by integrating predictive disaster management methodologies and flood forecasting systems to anticipate the high-risk zones.
* Environmental (Pollution): This is triggered when the AQI (Air Quality Index) surpasses the hazardous thresholds and forces the authorities to restrict outdoor work.
* Social (Gridlock/Curfew): This is triggered via simulated platform APIs which indicate the inability to access the pickup/drop locations due to any unplanned curfews or local strikes. We also utilize NLP (Natural Language Processing) to parse the local news alerts for immediate validation of any such events.

## 5. AIML Integration and Intelligent Fraud Defense
To ensure that the platform remains profitable, we integrate intelligent fraud detection at the very core.
* Predictive Risk Modeling: We implement advanced data mining and time-series forecasting to anticipate the disruption events before they happen which optimizes our policy creation.
* Location and Activity Validation: Our Machine Learning models detect the anomaly patterns in any claims. The system performs location and activity validation in order to ensure that the rider was actually active in the zone that if affected.
* Duplicate Prevention: The architecture includes strict duplicate claim prevention mechanisms to maintain the financial health.

## 6. Adversial Defense & Anti-Spoofing Strategy 

**Our Threat:** Coordinated fraud rings by using sophisticated GPS spoofers and emulators to simulate hundreds of delivery partners who are stranded in disaster zones which aims to drain he parametric liquidity pool.

**Our Philosophy:** Simple GPS verification is dead. Location is no longer a single data point, instead it is a multi-dimensional context. GigInsura relies on a **Defense-in-Depth** strategy by using physical telemetry, network clustering and deep platform cross-validation to catch the bad actors without any obstruction to the honest workers.

Our logic for defense architecture:

### 1. Spotting the Faker: Telemetry Physics and Time-Space Rules
A spoofer can be used to easily fake a latitude and longitude, but in order to do so, there are high computational expenses and complexity.
* **The Velocity Check (Time-Space Impossibility):** If a rider has completed an order in Zone A at 2:00 PM and their device pings a disaster trigger in Zone B which is 15km away at 2:04 PM then the claim is automatically flagged. The calculation of the physical impossibility of that travel speed is done by AI.
* **Hardware Sensor Noise (Emulator Detection):** Real humans generate noise. If there's a genuinely stranded worker, the worker's phone will show natural micro-fluctuations in the accelerometer and irregular battery drainage. A spoofer runs 50 instances on a server emulator and it will mathematically output the perfect flatlines for the battery drop and zero accelerometer variance. We flag the "perfect" data.
* **Network Environment Scanning:** A real phone which is in a flooded market will see a chaotic mix of fluctuating WiFI SSIDs and varying cell tower signal strengths. The devices that are spoofed, often fail to simulate the ambient network environment accurately.

### 2. Catching the Fraud Ring: Behavioural Clustering
A single faker is an anomaly whereas, 500 fakers are a pattern. We use Network Graph Analysis to catch the coordinated attacks before any payouts are processed.
* **Timestamp Synchronicity:** The honest workers get organically stranded over a span of minutes or hours as a storm rolls in. The fraud rings use scripts. If there are 500 claims that are triggered from the exact same risk polygon within a microscopic 3-second window then the system freezes those specific payouts for manual or secondary AI review.
* **Digital Fingerprinting:** We analyze the metadata payload. If there's a massive cluster of claims that share the same device model, the same OS build version or it originates from the same IP subnet/VPN node despite any claim of being scattered across a 5km radius then the ring is exposed.
* **Financial Bottlenecks:** The fraud rings eventually have to extract money. We monitor the target UPI handles and the bank account prefixes. The high volumes of distinct claims that route to highly similar or sequentially generated account numbers trigger an immediate liquidity lock.

### 3. Protection of Honest Workers
The ultimate goal is the protection of the genuinely stranded rider without making them jump through any hoops like, taking selfies in a rainstorm, etc. We protect the honest worker by relying on an un-spoofable source of truth.
**Deep Platform Cross-Validation:** We not only check if the GigInsura app thinks that the rider is in the flood zone but also securely query the parent Q-Commerce platform's (e.g., Blinkit/Zepto/Instamart) dispatch API.
**The "Proo of Assignment" Rule:** A spoofer can fake their GPS to look like they are in a flooded zone. However, they cannot fake the parent platform's internal backend logs. If the parent platform confirms that "Rider XYZ was actively assigned to an order traversing their exact geofence within the last 15 minutes," then the claim is instantly approved. As a result, the honest worker instantly gets paid whereas, the spoofer who has no legitimate active order history in that specific zone is denied the claim.

## 7. Platform Choice: Web Application
We have chose to build a robust Web application for our project idea.

### The Reason Why?
- Q-Commerce riders already suffer from phone battery drain and storage limits due to heavy delivery applications.
- A full-stack web application requires no app store installation, it consume minimal storage and provides instantaneous access to the dashboard.
- Furthermore, a web architecture is vastly superior for building the complex analytics dashboard which shows relevant metrics that are required for the Insurer/Admin side.

## 8. Tech Stack and Architecture
Here, we basically outline our tech stack and development plan.
* Frontend: Next.js and Tailwind CSS for rapid, responsive and highly performant UI development.
* Backend: Node.js/Next.js API Routes by utilizing TypeScript for robust and type-safe logic building.
* Database: MongoDB which is ideal for handling the unstructured, real-time telemetry and API payload data in an efficient manner.
* AIML: We will be using Python for executing our data science algorithms, predictive risk models and NLP taks for anomaly detection.
* Integrations: Free tiers or mokcs/dummies of Weather APIs, simulated traffic data and mock/dummy payment systems.