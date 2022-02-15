const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {

  router.get("/:quizId", (req, res) => {

    const quiz_id = req.params.quizId;
    let questionsArray = [];
    let answersArray = {};
    let quiz;

    db.getQuizWithQuizId(quiz_id).then(q => quiz = q);

    db.getQuestionsWithQuizId(quiz_id)
      .then(questions => {

        // let answersArray = {};

        for(let x of questions) {

          db.getAnswersWithQuestionId(x.id)
            .then(answers => {
              // console.log(answers)
              // x.answers = answers;
              // answersArray.push(answers);
              answersArray[`question${x.id}`] = answers;
              console.log(answersArray[`question${x.id}`]);
              // res.send({questions, answers});

            })
            .catch(err => console.log('hi'+err.message));

            // console.log(answersArray[`question${x.id}`]);
        }
        // console.log(answersArray.question1);
        questionsArray = questions;
        // return answersArray;
        // console.log(answersArray[`questions${questions[0].id}`])
        // console.log('sfd'+answersArray)

        res.send({ "questions": questionsArray, "answers": answersArray });


      })
      .catch(err => console.log(err.message));

  });


return router;
};
