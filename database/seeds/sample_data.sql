-- Sample predictions data
INSERT INTO predictions (station, hour, day, predicted_demand, crowd_level, created_at) VALUES
('Baiyappanahalli', 8, 'Monday', 450, 'High', datetime('now', '-1 hour')),
('Indiranagar', 9, 'Monday', 320, 'Medium', datetime('now', '-1 hour')),
('MG Road', 10, 'Monday', 280, 'Medium', datetime('now', '-1 hour')),
('Cubbon Park', 11, 'Monday', 200, 'Low', datetime('now', '-1 hour')),
('Majestic', 12, 'Monday', 520, 'High', datetime('now', '-1 hour')),
('Vijayanagar', 13, 'Monday', 380, 'Medium', datetime('now', '-1 hour')),
('Whitefield', 14, 'Monday', 290, 'Medium', datetime('now', '-1 hour')),
('Yeshwanthpur', 15, 'Monday', 340, 'Medium', datetime('now', '-1 hour')),
('Rajajinagar', 16, 'Monday', 410, 'High', datetime('now', '-1 hour')),
('Jayanagar', 17, 'Monday', 360, 'Medium', datetime('now', '-1 hour'));

-- Sample fraud alerts data
INSERT INTO fraud_alerts (ticket_id, fraud_probability, reason, created_at) VALUES
('TICKET-001', 0.85, 'Multiple rapid validations', datetime('now', '-30 minutes')),
('TICKET-002', 0.72, 'Unusual travel pattern', datetime('now', '-45 minutes')),
('TICKET-003', 0.91, 'Entry without exit record', datetime('now', '-1 hour')),
('TICKET-004', 0.68, 'Time gap anomaly', datetime('now', '-2 hours')),
('TICKET-005', 0.79, 'Frequent short trips', datetime('now', '-3 hours'));