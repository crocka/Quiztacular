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

const getUserWithEmail = function(email) {

  const queryString = `
  SELECT * FROM users
  WHERE email = $1;
  `;

  const queryParams = [email];

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows[0])
    .catch((err) => console.log('get email:'+err.message));

};

const getUserWithId = function(id) {


};

const getQuestionWithQuizId = function(id) {

};

const getAnswerWithQuestionId = function(id) {


};

const addUser = function() {


};

const addResult = function() {


};

const addQuiz = function() {


};

const addUserAnswer = function() {


};
