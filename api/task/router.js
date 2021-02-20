const Tasks = require('./model');
const express = require('express');

const convert = require('../../data/helpers/conversions');

const router = express.Router();

// Middleware to validate the body contents
function validate(req, res, next) {
  const { task_description, project_id } = req.body;
  task_description && project_id
    ? next()
    : res.status(400).json({ message: 'Task description is REQUIRED' });
}

router.get('/', async (req, res, next) => {
  try {
    const data = await Tasks.get();
    res.json(
      data.map((task) => {
        return {
          ...task,
          task_completed: convert.intToBoolean(task.task_completed),
        };
      }),
    );
  } catch (err) {
    res.status(500).json({
      Error: `DATABASE ERROR: ${err.errno}, please contact your database admin`,
    });
    next(err);
  }
});

router.post('/', validate, async (req, res, next) => {
  try {
    const data = await Tasks.post(req.body);
    const fixedData = await {
      ...data,
      task_completed: convert.intToBoolean(data.task_completed),
    };
    res.json(fixedData);
  } catch (err) {
    res.status(500).json({
      Error: `DATABASE ERROR: ${err.errno}, please contact your database admin`,
    });
    next(err);
  }
});

module.exports = router;
