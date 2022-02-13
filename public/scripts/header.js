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
          <button type="button" class="login_button">Log In</button>
          <button type="button" class="sign-up_button">Sign Up</button>
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

    $("header").on('click', '.login_button', () => {
    console.log('clicked')
    views_manager.show('logIn');

    //slidown login_form
    $('#login_form').is(':hidden') ? $('#login_form').slideDown() : $('#login_form').slideUp();

  });

  $("header").on('click', '.sign-up_button', () => {
    console.log('clicked')
    views_manager.show('registration');
    //slidown sign-up_form
    $('#signup_form').is(':hidden') ? $('#signup_form').slideDown() : $('#signup_form').slideUp();

  });

  $("header").on('click', '.create_quiz_button', () => {

    //show create quiz form
  });

  $("header").on('click', '.my_quizzes_button', () => {

    //show quiz list
  });

  $("header").on('click', '.logout_button', () => {
    logOut().then(() => {
      header.update(null);
    });
  });

});
