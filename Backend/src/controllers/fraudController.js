const fraudModel = require("../models/fraudModel");

const getFraudAlerts = async (req, res) => {
  try {
    const fraudAlerts = await fraudModel.getAllFraudAlerts();
    res.json(fraudAlerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFraudAlertsByTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const fraudAlerts = await fraudModel.getFraudAlertsByTicket(ticketId);
    res.json(fraudAlerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createFraudAlert = async (req, res) => {
  try {
    const fraudAlert = await fraudModel.createFraudAlert(req.body);
    res.status(201).json(fraudAlert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getFraudAlerts,
  getFraudAlertsByTicket,
  createFraudAlert,
};
