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

function getAllQuizzes(data) {

  return $.ajax({
    method: "GET",
    url: "/api/",
    data
  });
}

function getMyDetails() {
  console.log("getMyDetails");
  return $.ajax({
    url: "/users/me",
  });
}
