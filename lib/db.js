const bcrypt = require('bcrypt');
const { Pool } = require("pg");

let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

// module.exports = dbParams;

const pool = new Pool(dbParams);

//Below are methods to interact with the database
//We need to get a user object (containing name, email, and password) from email
//Get a user from user_id
//Get user's results
//Get the quizzes that a user has created
//Get the total number of quizzes the user has completed

const getAllQuizzes = function () {

  const queryString = `
  SELECT * FROM quizzes
  ORDER BY created_at DESC;
  `;

  return pool
  .query(queryString)
  .then(result => result.rows)
  .catch(err => console.log(err.message));

};

exports.getAllQuizzes = getAllQuizzes;

const getMyQuizzes = function (user_id) {

  const queryString = `
  SELECT * FROM quizzes
  WHERE user_id = $1
  ORDER BY created_at DESC;
  `;

  return pool
  .query(queryString, [user_id])
  .then(result => result.rows)
  .catch(err => console.log(err.message));

};

exports.getMyQuizzes = getMyQuizzes;

const getAllQuizzesOfUser = function (user_id) {

  const queryString = `
  SELECT * FROM quizzes
  WHERE user_id = $1
  ORDER BY created_at DESC;
  `;

  const queryParams = [user_id];

  console.log('getmyquizzes',queryString, queryParams);

  return pool
  .query(queryString, queryParams)
  .then(result => result.rows)
  .catch(err => console.log(err.message));

};

exports.getAllQuizzesOfUser = getAllQuizzesOfUser;

const getUserWithEmail = function (email) {

  const queryString = `
  SELECT * FROM users
  WHERE email = $1
  `;

  const queryParams = [email];

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows[0])
    .catch((err) => console.log('get email:' + err.message));

};

exports.getUserWithEmail = getUserWithEmail;


const getUserWithId = function (id) {
  const queryString = `
  SELECT * FROM users
  WHERE id = $1;
  `;

  const queryParams = [id];

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows[0])
    .catch((err) => console.log(err.message));

};

exports.getUserWithId = getUserWithId;

const getQuizWithQuizId = function (id) {

  let queryString = `
    SELECT * FROM quizzes
    WHERE id = $1;
    `;

  const queryParams = [id];

  console.log(queryString, queryParams);

  return pool
    .query(queryString, queryParams)
    .then(result => result.rows[0])
    .catch(err => console.log(err.message));

};

exports.getQuizWithQuizId = getQuizWithQuizId;

const getQuestionsWithQuizId = function (id) {

  let queryString = `
    SELECT * FROM questions
    WHERE quiz_id = $1;
    `;

  const queryParams = [id];

  console.log(queryString, queryParams);

  return pool
    .query(queryString, queryParams)
    .then(result => result.rows)
    .catch(err => console.log(err.message));

};

exports.getQuestionsWithQuizId = getQuestionsWithQuizId;

const getAnswersWithQuestionId = function (id) {

  let queryString = `
  SELECT * FROM answers
  WHERE question_id = $1;
  `;

  const queryParams = [id];

  console.log(queryString, queryParams);

  return pool
    .query(queryString, queryParams)
    .then(result => result.rows)
    .catch(err => console.log(err.message));

};

exports.getAnswersWithQuestionId = getAnswersWithQuestionId;

const getNumberOfQuestions = function(quizId) {

  const queryString = `
  SELECT COUNT(id)
  FROM questions
  WHERE quiz_id = $1
  GROUP BY quiz_id;
  `;

  const queryParams = [quizId];

  return pool
  .query(queryString, queryParams)
  .then(result => result.rows[0])
  .catch(err => console.log(err.message));

};

exports.getNumberOfQuestions = getNumberOfQuestions;

const getScore = function(userId, quizId, numOfQuestion, attempt) {

  const queryString = `

  SELECT ((COUNT(questions.id) * 100 / $1 * 100) / 100)
  FROM questions
  JOIN quizzes ON quizzes.id = questions.quiz_id
  JOIN answers ON questions.id = answers.question_id
  JOIN user_answer ON user_answer.answer_id = answers.id
  WHERE user_answer.user_id = $2 AND quizzes.id = $3 AND user_answer.attempt = $4 AND answers.is_correct = TRUE;

  `;

  const queryParams = [Number(numOfQuestion), userId, Number(quizId), Number(attempt)];

  // console.log(queryString, queryParams);
  return pool
  .query(queryString, queryParams)
  .then(result => result.rows[0]["?column?"])
  .catch(err => console.log(err.message));

};

exports.getScore = getScore;


const addUser = function (user) {
  const queryString = `
  INSERT INTO users (name, password, email)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  const queryParams = [user.name, user.password, user.email];

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows[0])
    .catch(err => console.log('addUser'+err.message));
};

exports.addUser = addUser;

const addResult = function (user_id, quiz_id, score) {

  const queryString = `
  INSERT INTO results (user_id, quiz_id, score, completed_at)
  VALUES ($1, $2, $3, NOW())
  RETURNING *;
  `;

  const queryParams = [user_id, Number(quiz_id), Number(score)]
  console.log(queryString, queryParams);
  return pool
  .query(queryString, queryParams)
  .then((result) => result.rows[0])
  .catch(err => console.log('db addresult',err.message));

};

exports.addResult = addResult;


const addQuiz = function (quiz) {
  const queryString = `
  INSERT INTO quizzes (user_id, title, is_Hidden, created_at, level_of_difficulty, subject, description)
  VALUES ($1, $2, $3, NOW(), $4, $5, $6)
  RETURNING *;
  `;

  queryParams = [quiz.user_id, quiz.title, quiz.is_Hidden, quiz.level_of_difficulty, quiz.subject, quiz.description]

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows[0])
    .catch(err => console.log('123:'+err.message));
};

exports.addQuiz = addQuiz;

const addQuestion = function (question) {
  const queryString = `
  INSERT INTO questions (quiz_id, title)
  VALUES ($1, $2)
  RETURNING *;
  `;

  queryParams = [question.quiz_id, question.title];

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows[0])
    .catch(err => console.log(err.message));
};

exports.addQuestion = addQuestion;

const addAnswer = function (answer) {
  const queryString = `
  INSERT INTO answers (question_id, title, is_correct)
  VALUES ($1, $2, $3)
  RETURNING *;`;

  queryParams = [answer.question_id, answer.title, answer.is_correct];

  return pool
  .query(queryString, queryParams)
  .then((result) => result.rows[0])
  .catch(err => console.log('123:'+err.message));

};

exports.addAnswer = addAnswer;

const addUserAnswer = function(user_id, answer_id, attempt) {

  const queryString = `
  INSERT INTO user_answer (user_id, answer_id, attempt)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

  // const attempt = getUserAttempt(user_id, quiz_id) + 1;

  const queryParams = [user_id, answer_id, attempt];

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows[0])
    .catch(err => console.log('hey',err.message));
};

exports.addUserAnswer = addUserAnswer;

const getUserAttempt = function (userId, quizId) {

  const queryString = `
  SELECT COUNT(score)
  FROM results
  WHERE user_id = $1 AND quiz_id = $2
  `;

  const queryParams = [userId, quizId];

  return pool
    .query(queryString,queryParams)
    .then(result => result.rows[0].count)
    .catch((err) => console.log(err.message));


};

exports.getUserAttempt = getUserAttempt;
  // try{
  //   const attempt = pool.query(queryString, queryParams);
  //   console.log(attempt);
  // } catch (err) {
  //   console.log(err.message);
  // }




  // , (err, res) => {

  //   if(err) {

  //     console.log(err.message);

  //   } else {

  //     console.log("fuck", Number(res.rows[0].count))
  //     return Number(res.rows[0].count);

  //   }
  // });
const getResult = function (resultId) {
  const queryString = `
  SELECT * FROM results
  WHERE results.id = $1
  `;

  const queryParams = [resultId];

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows[0])
    .catch((err) => console.log(err.message));

};

exports.getResult = getResult;
