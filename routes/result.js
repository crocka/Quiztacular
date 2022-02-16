const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/:userId_resultId', (req, res) => {

    res.render('result');

  });

  return router;
};
