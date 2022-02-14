const express = require('express');
const { user } = require('pg/lib/defaults');
const router  = express.Router();

module.exports = (db) => {

  // //get questions and answers with quiz id
  // router.get("/:quizId", (req, res) => {

  //   const quizId = req.params.quizId;

  //   db.getQuestionsWithQuizId
  //     .then(data => {
  //       const widgets = data.rows;
  //       res.json({ widgets });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  // all quizzes for main page
  router.get('/',(req, res) => {

    db.getAllQuizzes()
      .then(data => res.send(data))
      .catch(err => console.log(err.message));

  });

  // all quizzes of a user
  router.get('/:user_id', (req, res) => {

    const user_id = req.session.userId;

    db.getAllQuizzesOfUser(user_id)
      .then(data => res.send(data))
      .catch(err => console.log(err.message));

  });

  // all results of a user





  // update user_answer
  router.post('/user_answer', (req, res) => {

    const user_id = req.session.userId;
    const answers = req.body; //array of answers.id

    answers.forEach(x => {

      db.addUserAnswer(user_id,x)
      .then(data => res.send(data))
      .catch(err => console.log(err.message));

    });
  });

  // update quiz in creating new quizzes
  router.post('/newQuiz', (req, res) => {

    console.log(req);
    const user_id = req.session.userId;
    const quiz = req.body.quiz; //one quiz object
    const questions = req.body.questions; // array of quesions object
    const answers = req.body.answers; //array of answers object

    // db.addQuiz(quiz)
    //   .then(data => res.send(data))
    //   .catch(err => console.log(err.message));

    // questions.forEach(x => {
    //   db.addQuestion(x)
    //   .then(data => res.send(data))
    //   .catch(err => console.log(err.message));

    // });

    // answers.forEach(x => {
    //   db.addAnswer(x)
    //   .then(data => res.send(data))
    //   .catch(err => console.log(err.message));

    // });

  });

  return router;
};


// /Users
// /API QUIZZES THAT BELONG TO A user
// /QUIZ TO A SPECIFIC QUIZ
// /results/RESULTSID
// /QUIZ/:QUIZID
