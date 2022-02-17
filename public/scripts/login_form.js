$(() => {

  const $logInForm = $(`
  <form id="login-form" class="login-form">
      <p>Login</p>
      <div class="login-form__field-wrapper">
        <input type="email" name="email" placeholder="Email">
      </div>

      <div class="login-form__field-wrapper">
          <input type="password" name="password" placeholder="Password">
        </div>

      <div class="login-form__field-wrapper">
        <form action='/' method='GET'>
          <button>Login</button>
        </form>
          <a id="login-form__cancel" href="#">Cancel</a>
      </div>
    </form>
  `);

  window.$logInForm = $logInForm;

  $logInForm.on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();

    logIn(data)
      .then(json => {
        console.log(json);
        if (!json.user) {
          views_manager.show('error', 'Failed to login');
          return;
        }
        console.log(json.user);
        header.update(json.user);
        views_manager.show('quiz_list');
      });
  });

  $('body').on('click', '#login-form__cancel', function() {
    views_manager.show('quiz_list');
    return false;
  });

});
