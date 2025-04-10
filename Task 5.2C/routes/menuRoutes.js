const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index');

// Passing the DB to controller using middleware
module.exports = (db) => {
  router.get('/', (req, res) => controllers.menuController.fetchMenu(req, res, db));
  return router;
};
