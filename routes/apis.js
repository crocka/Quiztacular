require("dotenv").config();
const PORT = process.env.PORT || 8080;
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

    console.log(req.body);
    let quiz_id;
    const user_id = req.session.userId;
    const data = req.body; //one quiz object
    // let questions = [];

    const quiz = {

      "user_id": user_id,
      "title": data.quiz_title,
      "is_Hidden": data.quiz_isHidden ? true : false,
      "level_of_difficulty": Number(data.quiz_level_of_difficulty),
      "subject": data.quiz_subject,
      "description": data.quiz_description

    };
    // console.log("hiddendata " +data.quiz_isHidden)

    db.addQuiz(quiz)
      .then(data => {

        quiz_id = data.id;
        res.send(data);

      })
      .then(() => {

        for (let i = 0; i < data.question_title.length; i++) {

          // console.log('hi:' + data.question_title[i]);

          let question = {
            "quiz_id": quiz_id,
            "title": data.question_title[i]
          };

          // console.log('hi2:' + question);

          db.addQuestion(question)
            .then(question => {

              let question_id = question.id;

              for (let j = 0; j < data[`question${i}_answer`].length; j++) {

                let answerCorrectArray = data[`question${i}answer_is_correct`].slice(1);

                let answer = {
                  "question_id": question_id,
                  "title": data[`question${i}_answer`][j],
                  "is_correct": answerCorrectArray[j]
                };

                // console.log(answer.question_id)
                // console.log(answer.title)
                // console.log(answer.is_correct)
                db.addAnswer(answer);

              };


            })

        };

      })
      .catch(err => console.log('1234:' + err.message));

    // answers.forEach(x => {
    //
    //   .then(data => res.send(data))
    //   .catch(err => console.log(err.message));

    // });

    // .then(() => {

    //   for (let i = 0; i < data.question_title.length; i++) {

    //     // console.log('hi:' + data.question_title[i]);

    //     let answer = {
    //       "question_id": quiz_id,
    //       "title": data.question_title[i]
    //     };

    //     // console.log('hi2:' + question);

    //     db.addAnswer(answer);

    //   };

    // })

  });

  return router;
};


// /Users
// /API QUIZZES THAT BELONG TO A user
// /QUIZ TO A SPECIFIC QUIZ
// /results/RESULTSID
// /QUIZ/:QUIZID
