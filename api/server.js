const express = require('express');
const server = express();
const helmet = require('helmet');

const projectsRouter = require('./project/router');
const resourcesRouter = require('./resource/router');
const tasksRouter = require('./task/router');

server.use(helmet(), express.json());
server.use('/api/projects', projectsRouter);
server.use('/api/resources', resourcesRouter);
server.use('/api/tasks', tasksRouter);

server.use('*', (req, res) => {
  res.status(404).json({ message: '** 404 Not Found **' });
});

module.exports = server;
