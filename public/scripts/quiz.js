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
       <h3>Level of Difficulty: ${quiz.level_of_difficulty}</h3>
      </header>

      <body>${quiz.description}</body>


      <footer class='quiz_box_footer'>

      <form action='/quiz/${quiz.id}' method='POST'>
        <button type="submit" class="btn">
          <i type='submit' class="fa-solid fa-play fa-2xl"></i>
        </button>

      </form>
      <span id='/quiz/${quiz.id}'>
        <button class="shareButtonQuiz">
          <i id='shareButton${quiz.id}' class="fa-solid fa-share"></i>
        </button>
      </span>

      </footer>

    </article>
    `;
  };

  window.quizList.createQuiz = createQuiz;

});
