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

      <
      <footer>
      <p>${quiz.created_at}</p>
      <p>${quiz.lever_of_difficulty}</p>
      </footer>

    </article>
    `;
  };

  window.quizList.createQuiz = createQuiz;
});
