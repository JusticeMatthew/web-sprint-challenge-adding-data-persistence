const Projects = require('./model');
const express = require('express');

const convert = require('../../data/helpers/conversions');

const router = express.Router();

// Middleware to validate the body contents
function validate(req, res, next) {
  const newProject = req.body.project_name;
  newProject
    ? next()
    : res.status(400).json({ message: 'Project name is REQUIRED' });
}

router.get('/', async (req, res, next) => {
  try {
    const data = await Projects.get();
    const fixedData = await data.map((project) => {
      return {
        ...project,
        project_completed: convert.intToBoolean(project.project_completed),
      };
    });
    res.json(fixedData);
  } catch (err) {
    res.status(500).json({
      Error: `DATABASE ERROR: ${err.errno}, please contact your database admin`,
    });
    next(err);
  }
});

router.post('/', validate, async (req, res, next) => {
  try {
    const project = req.body;
    const data = await Projects.post(project);
    const fixedData = await {
      ...data,
      project_completed: convert.intToBoolean(data.project_completed),
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
