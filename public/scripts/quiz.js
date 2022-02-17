$(() => {

  window.quizList = {};

  function createQuiz(quiz,public) {

    // getMyDetails()
    // .then((j) => {

      let dateArray = quiz.created_at.split('T');
      let date = dateArray[0];

      let difficulty;

      if (quiz.level_of_difficulty === 1) {
        difficulty = 'Easy';
      } else if (quiz.level_of_difficulty === 2) {
        difficulty = 'Medium';
      } else {
        difficulty = "Hard";
      }

      if(quiz.is_hidden && public) {
        return;
      }

      return `

      <article class="quiz_box">
        <header class="quiz_box_header">
        <h1 class="quiz_title">${quiz.title}</h1>
        <h3 class="quiz_subject">${quiz.subject}</h3>
         <h3>${difficulty}</h3>
         <h3 class='isHiddenTag'>${quiz.is_hidden ? 'Hidden' : ''}</h3>
         <h3> Created on: ${date}</h3>
        </header>

        <body>${quiz.description}</body>


        <footer class='quiz_box_footer'>

        <form action='/quiz/${quiz.id}' method='POST'>
          <button type="submit" class="btn">
            <i type='submit' class="fa-solid fa-play fa-2xl"></i>
          </button>

        </form>
        <span id='/quiz/${quiz.id}' class='share'>
          <button class="shareButtonQuiz">
            <i id='shareButton${quiz.id}' class="fa-solid fa-share"></i>
          </button>
        </span>

        </footer>

      </article>
      `;


    // })
    // .catch(err => console.log(err));


  };

  window.quizList.createQuiz = createQuiz;

});
