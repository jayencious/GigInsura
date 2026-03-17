# GigInsura

## Project Overview
- India's platform-based delivery partners which include those who work for platforms like Blinkit, Zepto, Swiggy Instamart, etc., are the backbone of our country's fast-paced digital economy.
- However, the external disruptions such as extreme weather conditions, pollution and natural disasters can reduce their work hours and cause them to lose about 20-30% of their monthly earnings.
- As of now, these gig workers do not have any income protection against these unexpected and uncontrollable events, so we need a solution for this problem.

- **GigInsura** is an AI-powered parametric insurance platform for Q-commerce gig workers to safeguard them from the income losses that are caused by extreme weather conditions and other external disruptions.
- Our solution provides automated coverage and payouts, it incorporates intelligent fraud detection mechanisms and procedures and operates on a simple weekly pricing model that is aligned with the typical earnings cycle of the gig workers.
- We strictly exclude any coverage for health, life, accidents or vehicle repairs.

## 1. Target Persona and Scenario
**Persona:** Grocery/Q-Commerce Delivery Partners (e.g., Blinkit, Zepto, Swiggy Instamart, etc).

**Scenario:**
- A Q-Commerce delivery partner operates within a tight 2-3 km radius.
- A sudden, severe pre-monsoon heavy rainfall floods the main roads in their zone which results in extreme heavy rain and floods.
- As a result, the deliveries are halted by such platforms for about 3-5 hours.

* Without GigInsura: The partner needs to bear the full financial loss without any safety net.
* With GigInsura: Our system detects heavy rainfall triggers and the platform halts via an API (Application Programming Interface). An automatic claim initiatino occurs for the identified disruptions to ensure an instant payout to be processed for the lost income.

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

## 6. Platform Choice: Web Application
We have chose to build a robust Web application for our project idea.

### The Reason Why?
- Q-Commerce riders already suffer from phone battery drain and storage limits due to heavy delivery applications.
- A full-stack web application requires no app store installation, it consume minimal storage and provides instantaneous access to the dashboard.
- Furthermore, a web architecture is vastly superior for building the complex analytics dashboard which shows relevant metrics that are required for the Insurer/Admin side.

## 7. Tech Stack and Architecture
Here, we basically outline our tech stack and development plan.
* Frontend: Next.js and Tailwind CSS for rapid, responsive and highly performant UI development.
* Backend: Node.js/Next.js API Routes by utilizing TypeScript for robust and type-safe logic building.
* Database: MongoDB which is ideal for handling the unstructured, real-time telemetry and API payload data in an efficient manner.
* AIML: We will be using Python for executing our data science algorithms, predictive risk models and NLP taks for anomaly detection.
* Integrations: Free tiers or mokcs/dummies of Weather APIs, simulated traffic data and mock/dummy payment systems.

## 8. Development Roadmap
We have divided our 6-week development journey into three phases.
* Phase 1 (Weeks 1-2): Ideation, foundation and defining the workflow of our application.
* Phase 2 (Weeks 3-4): We will build 3-5 automated triggers using public/mock APIs in order to identify the disruptions and implement dynamic premium calculation.
* Phase 3 (Weeks 5-6): Scaling and optimization of the project by developing advanced fraud detection to catch the delivery-specific fraud and integrating simulated instant payouts.