const { Travel } = require('../models');

exports.createTravel = async (req, res) => {
  const { title, start_date, end_date } = req.body;
  try {
    const travel = await Travel.create({
      user_id: req.user.id,
      title,
      start_date,
      end_date
    });
    res.json(travel);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create travel' });
  }
};

exports.getTravels = async (req, res) => {
  try {
    const travels = await Travel.findAll({ where: { user_id: req.user.id } });
    res.json(travels);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch travels' });
  }
};

exports.getTravel = async (req, res) => {
  const { id } = req.params;
  try {
    const travel = await Travel.findByPk(id);
    if (!travel) {
      res.sendStatus(404);
    } else {
      res.json(travel);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch travel' });
  }
};

exports.updateTravel = async (req, res) => {
  const { id } = req.params;
  const { title, start_date, end_date } = req.body;
  try {
    const travel = await Travel.findByPk(id);
    if (travel) {
      travel.title = title;
      travel.start_date = start_date;
      travel.end_date = end_date;
      await travel.save();
      res.json(travel);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update travel' });
  }
};

exports.deleteTravel = async (req, res) => {
  const { id } = req.params;
  try {
    const travel = await Travel.findByPk(id);
    if (travel) {
      await travel.destroy();
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete travel' });
  }
};