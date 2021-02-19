const Resources = require('./model');
const express = require('express');

const router = express.Router();

// Middleware to validate the body contents
function validate(req, res, next) {
  req.body.resource_name
    ? next()
    : res.status(404).json({ message: 'Resource name is REQUIRED' });
}

router.get('/', async (req, res, next) => {
  try {
    const data = await Resources.get();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/', validate, async (req, res, next) => {
  try {
    const resource = req.body;
    const data = await Resources.post(resource);
    res.json(data);
  } catch (err) {
    err.errno === 19
      ? res.status(404).json({
          'Error Code': err.errno,
          message: 'Resource already exists!',
        })
      : res.status(500).json({
          Error: `DATABASE ERROR: ${err.errno}, please contact your database admin`,
        });
    next(err);
  }
});

module.exports = router;
