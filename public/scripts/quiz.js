$(() => {

  window.quizList = {};

  function createQuiz(quiz,public) {

    if(quiz.is_hidden && public) {
      return;
    }

    return `
    <article class="quiz_box">
      <header class="quiz_box_header">
      <h1 class="quiz_title">${quiz.title}</h1>
      <h3 class="quiz_subject">${quiz.subject}</h3>
      </header>

      <body>${quiz.description}</body>


      <footer class='quiz_box_footer'>
      <p>${quiz.level_of_difficulty}</p>
      <form action='/quiz/${quiz.id}' method='POST'>
        <input type='submit' value='Start'>
        <label>Share</label>
      </form>
      </footer>

    </article>
    `;
  };

  window.quizList.createQuiz = createQuiz;
});
