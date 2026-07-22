-- Sample analytics tables for the Eve + oleander demo.
-- Analogue of https://eve.dev/docs/tutorial/query-sample-data (lake instead of sql.js).
-- Ask the agent: run init.sql

CREATE SCHEMA IF NOT EXISTS oleander."eve_agent_with_oleander";

CREATE TABLE oleander."eve_agent_with_oleander".orders (
  id INTEGER,
  customer_id INTEGER,
  amount_cents INTEGER,
  created_at VARCHAR
);
INSERT INTO oleander."eve_agent_with_oleander".orders VALUES
  (1, 10, 4200, '2026-05-01'), (2, 10, 1500, '2026-05-03'),
  (3, 11, 9900, '2026-05-04'), (4, 12,  800, '2026-05-06');

CREATE TABLE oleander."eve_agent_with_oleander".customers (
  id INTEGER,
  name VARCHAR,
  plan VARCHAR
);
INSERT INTO oleander."eve_agent_with_oleander".customers VALUES
  (10, 'Acme', 'pro'), (11, 'Globex', 'enterprise'), (12, 'Initech', 'free');
