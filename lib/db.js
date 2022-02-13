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

const getAllQuizzesOfUser = function (user_id) {

  const queryString = `
  SELECT * FROM quizzes
  WHERE user_id = $1
  ORDER BY created_at DESC;
  `;

  const queryParams = [user_id];

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

const getScore = function(userId, quizId) {

  const queryString = `

  SELECT COUNT(questions.id) / $1
  FROM questions
  JOIN answers ON questions.answer_id = answers.id
  JOIN user_answer ON user_answer.answer_id = answers.id
  WHERE user_answer.user_id = $2 AND answers.isCorrect = TRUE
  GROUP BY user_answer.user_id, answers.question_id;

  `;

  const queryParams = [getNumberOfQuestions(quizId),userId];

  return pool
  .query(queryString, queryParams)
  .then(result => result.rows[0])
  .catch(err => console.log(err.message));

};

exports.getScore = getScore;


const addUser = function (user) {
  const queryString = `
  INSERT INTO users (username, password, email)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  const queryParams = [user.username, user.password, user.email];

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows[0])
    .catch(err => console.log(err.message));
};

exports.addUser = addUser;

const addResult = function (user_id, quiz_id, started_at, completed_at) {

  const queryString = `
  INSERT INTO results (user_id, quiz_id, score, started_at, completed_at)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `;

  const queryParams = [user_id, quiz_id, getScore(user_id, quiz_id), started_at, completed_at]

  return pool
  .query(queryString, queryParams)
  .then((result) => result.rows[0])
  .catch(err => console.log(err.message));

};

exports.addResult = addResult;


const addQuiz = function (quiz) {
  const queryString = `
  INSERT INTO quiz (user_id, title, url, isHidden, created_at, difficulty, subject, description)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *;
  `;

  queryParams = [quiz.user_id, quiz.title, quiz.url, quiz.isHidden, quiz.created_at, quiz.difficulty, quiz.subject, quiz.description]

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows[0])
    .catch(err => console.log(err.message));
};

exports.addQuiz = addQuiz;

const addQuestion = function (question) {
  const queryString = `
  INSERT INTO questions (quiz_id, question_title)
  VALUES ($1, $2)
  RETURNING *;
  `;

  queryParams = [questions.quiz_id, questions.title];

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows[0])
    .catch(err => console.log(err.message));
};

exports.addQuestion =addQuestion;

const addAnswer = function (answer) {
  const queryString = `
  INSERT INTO answers (quiz_id, question_id, correct_answer)
  VALUES ($1, $2, $3)
  RETURNING *;`;

  queryParam = [answer.quiz_id, answer.question_id, answer.correct_answer]

  return pool
  .query(queryString, queryParams)
  .then((result) => result.rows[0])
  .catch(err => console.log(err.message));

};

exports.addAnswer = addAnswer;

const addUserAnswer = function(user_id, answer_id) {

  const queryString = `
  INSERT INTO user_answer (user_id, answer_id, attempt)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

  const queryParams = [user_id, answer_id, getUserAttempt(userId, quizId) + 1];

  return pool
  .query(queryString, queryParams)
  .then((result) => result.rows[0])
  .catch(err => console.log(err.message));
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
  .query(queryString, queryParams)
  .then(result => result.rows[0])
  .catch(err => console.log(err.message));
};

exports.getUserAttempt = getUserAttempt;

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
