const { Plan } = require('../models');

exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.findAll();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch plans' });
  }
};

exports.getPlan = async (req, res) => {
  const { id } = req.params;
  try {
    const plan = await Plan.findByPk(id);
    if (!plan) {
      res.sendStatus(404);
    } else {
      res.json(plan);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch plan' });
  }
};

exports.createPlan = async (req, res) => {
  const { user_id, title, description, start_time, end_time, budget, date } = req.body;
  try {
    const plan = await Plan.create({
      user_id,
      title,
      description,
      start_time,
      end_time,
      budget,
      date
    });

    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create plan' });
  }
};

exports.updatePlan = async (req, res) => {
  const { id } = req.params;
  const { title, description, start_time, end_time, budget, date } = req.body;
  try {
    const plan = await Plan.findByPk(id);
    if (plan) {
      plan.title = title;
      plan.description = description;
      plan.start_time = start_time;
      plan.end_time = end_time;
      plan.budget = budget;
      plan.date = date;
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
  const { id } = req.params;
  try {
    const plan = await Plan.findByPk(id);
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