//const { Plan, Travel } = require('../models');

const db = require('../models/index.js');
const { Plan, Travel } = db;


exports.createPlan = async (req, res) => {
  const { id: travelId } = req.params;
  const { place_id, date, time, description, budget } = req.body;
  try {
    const travel = await Travel.findByPk(travelId);
    if (!travel) {
      return res.sendStatus(404);
    }

    const plan = await Plan.create({
      travel_id: travelId,
      place_id,
      date,
      time,
      description,
      budget
    });

    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create plan' });
  }
};

exports.getPlans = async (req, res) => {
  const { id: travelId } = req.params;
  try {
    const plans = await Plan.findAll({ where: { travel_id: travelId } });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch plans' });
  }
};

exports.getPlan = async (req, res) => {
  const { id: travelId, plan_id: planId } = req.params;
  try {
    const plan = await Plan.findOne({ where: { travel_id: travelId, id: planId } });
    if (!plan) {
      res.sendStatus(404);
    } else {
      res.json(plan);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch plan' });
  }
};

exports.updatePlan = async (req, res) => {
  const { id: travelId, plan_id: planId } = req.params;
  const { place_id,  date, time, description, budget } = req.body;
  try {
    const plan = await Plan.findOne({ where: { travel_id: travelId, id: planId } });
    if (plan) {
      plan.place_id = place_id;
      plan.description = description;
      plan.budget = budget;
      plan.date = date;
      plan.time = time;
      await plan.save();
      res.json(plan);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update plan' });
  }
};

exports.deletePlan = async (req, res) => {
  const { id: travelId, plan_id: planId } = req.params;
  try {
    const plan = await Plan.findOne({ where: { travel_id: travelId, id: planId } });
    if (plan) {
      await plan.destroy();
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete plan' });
  }
};