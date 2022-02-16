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
      <span class='logo'>Quiztacular</span>
        <div class='buttons'>
          <button type="button" class="login_button">Log In</button>
          <button type="button" class="sign-up_button">Sign Up</button>
        </div>
      </nav>
      `
    } else {
      userLinks = `
      <nav id="page-header__user-links" class="page-header__user-links">
      <span class='logo'>Quiztacular</span>
        <div>
          <ul>User: ${user.name}</ul>
            <button type='button' class="create_quiz_button">Create Quiz</button>
            <button type='button' class="my_quizzes_button">My Quizzes</button>
            <button type='button' class="logout_button">Log Out</button>
        </div>
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

    views_manager.show('new_quiz');

  });

  $("header").on('click', '.my_quizzes_button', () => {

    //show quiz list

    getMyQuizzes()
      .then(json => {

        quizLists.addMyQuizzes(json);
        // views_manager.show('quiz_list');

      })

  });

  $("header").on('click', '.logout_button', () => {
    logOut().then(() => {
      header.update(null);
    });
  });

});
