CREATE SCHEMA IF NOT EXISTS oleander."eve_agent_with_oleander";

DROP TABLE IF EXISTS oleander."eve_agent_with_oleander".orders;
CREATE TABLE oleander."eve_agent_with_oleander".orders AS
SELECT id, customer_id, amount_cents, CURRENT_DATE - days_ago AS created_at
FROM (VALUES
  (1, 10, 4200, 21),
  (2, 10, 1500, 14),
  (3, 11, 9900,  7),
  (4, 12,  800,  2)
) AS t(id, customer_id, amount_cents, days_ago);

DROP TABLE IF EXISTS oleander."eve_agent_with_oleander".customers;
CREATE TABLE oleander."eve_agent_with_oleander".customers AS
SELECT * FROM (VALUES
  (10, 'Acme', 'pro'),
  (11, 'Globex', 'enterprise'),
  (12, 'Initech', 'free')
) AS t(id, name, plan);
