require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const { user } = require('pg/lib/defaults');
const router = express.Router();

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
  router.get('/', (req, res) => {

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

      db.addUserAnswer(user_id, x)
        .then(data => res.send(data))
        .catch(err => console.log(err.message));

    });
  });

  // update quiz in creating new quizzes
  router.post('/newQuiz', (req, res) => {

    console.log(req);
    let quiz_id;
    const user_id = req.session.userId;
    const data = req.body; //one quiz object

    const quiz = {

      "user_id": user_id,
      "title": data.quiz_title,
      "isHidden": data.quiz_isHidden ? false : true,
      "level_of_difficulty": Number(data.quiz_level_of_difficulty),
      "subject": data.quiz_subject,
      "description": data.quiz_description

    };

    let questions = [];



    db.addQuiz(quiz)
      .then(data => {

        quiz_id = data.id;
        res.send(data);

      })
      .then(() => {

        console.log(data.question_title);

        for (let i = 0; i < data.question_title.length; i++) {

          questions.push({
            quiz_id: quiz_id,
            title: data.question_title[i],
          });

        };

        console.log('hi:' + questions)

        questions.forEach(x => {
          db.addQuestion(x)
            .then(data => res.send(data))
            .catch(err => console.log(err.message));

        });
      })
      .catch(err => console.log(err.message));

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
