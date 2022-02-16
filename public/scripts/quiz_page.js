$(() => {
  const url = window.location.href;

  const quiz_id_array = url.split('/')

  const quiz_id = Number(quiz_id_array[quiz_id_array.length - 1]);

  getQuiz(quiz_id)
    .then(json => {
      // console.log('res' , json);

      const userId = json.user_id;
      const quiz = json.quiz;
      const questionsArray = json.questions;
      const answersArray = json.answers;

      // console.log("asdf", answersArray)

      const createQuizAnswerElement = function (answer) {

        return `
        <option value="${answer.id}">${answer.title}</option>
        `;

      };

      const createQuizQuestionElement = function (question) {

        return `
        <article class='quiz-individual-questions'>
         <h3>${question.title}</h3>
         <div>
           <select name='answer' id='answer-section-for-question${question.id}'>


           </select>
         </div>
         </article>
        `;

      };

      const $quiz = $(`

      <form id="new-quiz-form" class="new-quiz-form">
        <h1>
          ${quiz.title}
        </h1>

        <h3>
         ${quiz.description}
        </h3>

        <div class='question-wrapper' id='quiz${quiz.id}'>



        </div>

        <div class="quiz__field-wrapper">
          <button type="submit" id="quiz_submit">Submit</button>
        </div>
      </form>
     `);

      // console.log('quizhtml' , $quiz);

      window.$quiz = $quiz;
      $('#main-content').append($quiz);


      for (let question of questionsArray) {


        $(`#quiz${quiz.id}`).append(createQuizQuestionElement(question));


      };

      for (let answers of answersArray) {

        for(let answer of answers) {

          $(`.quiz-individual-questions #answer-section-for-question${answer.question_id}`).append(createQuizAnswerElement(answer));

        }
      };

      $quiz.on('submit', function (event) {

        event.preventDefault();

        // console.log($(this));
        let answers = $(this).serialize();
        // answers.quiz_id = quiz_id;
        answers = `quizId=${quiz_id}&` + answers;

        // const data = {quiz_id: quiz_id, answers};

        // console.log($(this));
        console.log(answers)
        // createQuiz(data)
        createUserAnswer(answers);
      });

    });
})
