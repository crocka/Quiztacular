const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {

  // router.get("/quiz/:quizId", (req, res) => {

  //   const quiz_id = req.params.quizId;
  //   let questionsArray = [];
  //   let answersArray = {};
  //   let quiz;

  //   db.getQuizWithQuizId(quiz_id).then(q => quiz = q);

  //   db.getQuestionsWithQuizId(quiz_id)
  //     .then(questions => {

  //       questionsArray = questions;

  //       for (let x of questionsArray) {

  //         db.getAnswersWithQuestionId(x.id)
  //           .then(answers => {
  //             // console.log(answers)
  //             // x.answers = answers;
  //             // answersArray.push(answers);
  //             answersArray[`question${x.id}`] = answers;
  //             // console.log(answersArray[`question${x.id}`]);
  //             // res.send({questions, answers});

  //           })
  //       }

  //     })
  //     .catch(err => console.log(err.message));

  //   setTimeout(() => {res.send({ "questions": questionsArray, "answers": answersArray })}, 1000);

  // });


  router.post('/:quizId', (req, res) => {

    res.render('quiz')

  });

  return router;
};
   // console.log(answersArray.question1);
      // console.log(answersArray[`question${x.id}`]);
    // return answersArray;
    // console.log(answersArray[`questions${questions[0].id}`])
    // console.log('sfd'+answersArray)
