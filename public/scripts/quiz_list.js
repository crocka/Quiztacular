$(() => {

  const $quizLists = $(`
  <section class="quizLists" id="quizLists">
      <p>Loading...</p>
  </section>
  `);

  window.$quizLists = $quizLists;


  function addQuiz(quiz) {
    $quizLists.append(quiz);
  }

  function clearQuizzes() {
    $quizLists.empty();
  }

  window.quizLists = {};
  window.quizLists.clearQuizzes = clearQuizzes;

  function addQuizzes(quizzes) {
    clearQuizzes();
    for (const quiz of quizzes) {
      const quizHtml = quizList.createQuiz(quiz, true);
      addQuiz(quizHtml);
    }
  }
  window.quizLists.addQuizzes = addQuizzes;

  function addMyQuizzes(quizzes) {
    clearQuizzes();

    for (const quiz of quizzes) {

      const quizHtml = quizList.createQuiz(quiz, false);


      addQuiz(quizHtml);

    }

  }

  window.quizLists.addMyQuizzes = addMyQuizzes;

});
