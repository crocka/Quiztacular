$(() => {

  window.header = {};

  const $pageHeader = $('#page-header');
  let currentUser = null;
  function updateHeader(user) {
    currentUser = user;
    $pageHeader.find("#page-header__user-links").remove();
    let userLinks;

    if (!user) {
      userLinks = `
      <nav id="page-header__user-links" class="page-header__user-links">
        <ul>
          <li class="login_button">Log In</li>
          <li class="sign-up_button">Sign Up</li>
        </ul>
      </nav>
      `
    } else {
      userLinks = `
      <nav id="page-header__user-links" class="page-header__user-links">
        <ul>
          <li>${user.name}</li>
          <li class="create_quiz_button">Create Quiz</li>
          <li class="my_quizzes_button">My Quizzes</li>
          <li class="logout_button">Log Out</li>
        </ul>
      </nav>
      `
    }

    $pageHeader.append(userLinks);

  }

  window.header.update = updateHeader;

  getMyDetails()
    .then(function (json) {
      updateHeader(json.user);
    });

  $('.login_button').click(function() {

    //slidown login_form
    $('#login_form').is(':hidden') ? $('#login_form').slideDown() : $('#login_form').slideUp();

  });

  $('.sign-up_button').click(function() {

    //slidown sign-up_form
    $('#signup_form').is(':hidden') ? $('#signup_form').slideDown() : $('#signup_form').slideUp();

  });

  $('.create_quiz_button').click(function() {

    //show create quiz form
  });

  $('.my_quizzes_button').click(function() {

    //show quiz list
  });

  $('.logout_button').click(function() {
    logOut().then(() => {
      header.update(null);
    });
  });

});
