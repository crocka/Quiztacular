$(() => {
  const url = window.location.href;

  const quiz_id_array = url.replace('?','').split('/');

  const quiz_id = Number(quiz_id_array[quiz_id_array.length - 1]);

  getMyDetails()
    .then(function (json) {

      if (json.user) {
        getQuiz(quiz_id)
        .then(json => {
          const userId = json.user_id;
          const quiz = json.quiz;
          const questionsArray = json.questions;
          const answersArray = json.answers;

          const createQuizAnswerElement = function (answer) {

            return `
            <ul>
            <label class='answer'>
            <input type="checkbox" name="answer" value="${answer.id}">
            <span>${answer.title}</span>
            </label>
            </ul>
        `;

          };

          const createQuizQuestionElement = function (question) {

            return `
        <article class='quiz-individual-questions'>
         <h3>${question.title}</h3>
          <span>
           <div id='answer-section-for-question${question.id}'>
          </span>
         </div>
         <div class='divider'></div>

         </article>
        `;

          };

      const $quiz = $(`
      <form id="doing-quiz-form" class="doing-quiz-form">

        <h1>
          ${quiz.title}
        </h1>

        <h3>
         ${quiz.description}
        </h3>

        <div class='divider'></div>


        <div class='question-wrapper' id='quiz${quiz.id}'>

        </div>

        <div class="quiz__field-wrapper">
          <button type="submit" id="quiz_submit">Submit</button>
        </div>

      </form>
     `);

          window.$quiz = $quiz;
          $('#main-content').append($quiz);


          for (let question of questionsArray) {


            $(`#quiz${quiz.id}`).append(createQuizQuestionElement(question));


          };

          for (let answers of answersArray) {

            for (let answer of answers) {

              $(`.quiz-individual-questions #answer-section-for-question${answer.question_id}`).append(createQuizAnswerElement(answer));

            }
          };

          $quiz.on('submit', function (event) {

            event.preventDefault();

            let answers = $(this).serialize();
            answers = `quizId=${quiz_id}&` + answers;

            createUserAnswer(answers)
              .then(result => {
                window.location.replace(`http://localhost:8080/result/${result.user_id}_${result.id}`);
              })
              .catch(err => console.log(err));

          });
        });

      } else {

        views_manager.show('logIn');

      }
    });
})
