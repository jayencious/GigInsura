## Database Architecture (PostgreSQL - Powered by Supabase)

GigInsura relies on a strict relational data model hosted on Supabase which heavily utilizes **Row Level Security (RLS)** to cryptographically isolate rider data.

### TABLE: `public.users`
The core legder tying authentication to the GigInsura risk engine.

| Column Name           | Data Type | Constraints                   | Description                                                |
| :-------------------- | :-------- | :---------------------------- | :--------------------------------------------------------- |
| `id`                  | `UUID`    | `PRIMARY KEY`, `FOREIGN KEY`  | Securely references Supabase `auth.users` for strict Auth. |
| `name`                | `TEXT`    | `NOT NULL`                    | The rider or administrator's display name.                 |
| `platform_id`         | `TEXT`    | `UNIQUE`, `NOT NULL`          | System-generated unique identifier (e.g., `GIG-847291`).   |
| `role`                | `TEXT`    | `DEFAULT 'rider'`             | RBAC control flag. Accepts `'rider'` or `'admin'`.         |
| `delivery_zone`       | `TEXT`    | `NOT NULL`                    | The active operating zone mapping to OpenWeather GPS.      |
| `baseline_risk_score` | `NUMERIC` | `DEFAULT 1.0`                 | Multiplier based on historical rider safety metrics.       |
| `upi_id`              | `TEXT`    | `NOT NULL`                    | Financial routing ID for automated smart-contract payouts. |
| `phone`               | `TEXT`    | `NOT NULL`                    | Contact number for SMS disruption alerts.                  |

> **Security Note:** Read/Write operations on this table are locked down via PostgreSQL RLS policies. Riders can only `view their own data`, while Admins have elevated privileges to trigger platform-wide simulations.