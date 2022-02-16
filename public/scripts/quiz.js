$(() => {

  window.quizList = {};

  function createQuiz(quiz) {
    return `
    <article class="quiz_box">
      <header>
      <h1 class="quiz_title">${quiz.title}</h1>
      <h3 class="quiz_subject">${quiz.subject}</h3>
      </header>

      <body>${quiz.description}</body>


      <footer class='quiz_box_footer'>
      <p>${quiz.lever_of_difficulty}</p>
      <form action='/quiz/:quizId'>
        <input type='submit'>
        <label>Start</label>
        <label>Share</label>
      </form>
      </footer>

    </article>
    `;
  };

  window.quizList.createQuiz = createQuiz;
});
