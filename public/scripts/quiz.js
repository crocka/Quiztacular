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
      <p>Level of Difficulty: ${quiz.level_of_difficulty}</p>
      <form id='${quiz.id}' action='/quiz/${quiz.id}' method='POST'>
          <i type='submit' class="fa-solid fa-play"></i>
      </form>
        <div>
          <i class="fa-solid fa-share"></i>
        </div>


      </footer>

    </article>
    `;
  };

  window.quizList.createQuiz = createQuiz;

});
