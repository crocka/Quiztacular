function logOut() {
  return $.ajax({
    method: "POST",
    url: "/users/logout",
  })
};

function logIn(data) {
  return $.ajax({
    method: "POST",
    url: "/users/login",
    data
  });
}

function signUp(data) {
  return $.ajax({
    method: "POST",
    url: "/users/register",
    data
  });
}

function getAllQuizzes() {

  return $.ajax({
    method: "GET",
    url: "/api/",
  });
}

function getMyQuizzes() {

  return $.ajax({
    method: "GET",
    url: "/api/my",
  });
}

function getQuiz(quizId) {

  return $.ajax({
    method: "GET",
    url: `/api/quiz/${quizId}`,
  });
}

const getResult = function(userId_resultId) {
  return $.ajax({
    method: "GET",
    url: `/api/result/${userId_resultId}`
  });
}


function getMyDetails() {
  return $.ajax({
    method: "GET",
    url: "/users/me",
  });
}

const createQuiz = function(data) {
  return $.ajax({
    method: "POST",
    url: "/api/newQuiz",
    data,
  });
}


const createUserAnswer = function(data) {
  return $.ajax({
    method: "POST",
    url: "/api/user_answer",
    data,
  });
}

