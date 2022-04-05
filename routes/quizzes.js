const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {

  router.get('/:quizId', (req, res) => {

    res.render('quiz')

  });

  router.post('/:quizId', (req, res) => {

    res.render('quiz')

  });

  return router;
};
