$(() => {

  const $main = $('#main-content');

  window.views_manager = {};

  window.views_manager.show = function(item) {
    // $newQuizForm.detach();
    // $quizList.detach();
    // $registrationForm.detach();
    // $logInForm.detach();

    switch (item) {
      case 'quiz_list':
        $quizList.appendTo($main);
        break;
      case 'new_quiz':
        $newQuizForm.appendTo($main);
        break;
      case 'registration':
        $signUpForm.appendTo($main);
        break;
      case 'logIn':
        $logInForm.appendTo($main);
        break;
      case 'error': {
        const $error = $(`<p>${arguments[1]}</p>`);
        $error.appendTo('body');
        setTimeout(() => {
          $error.remove();
          views_manager.show('quiz_list');
        }, 2000);

        break;
      }
    }
  }

});
