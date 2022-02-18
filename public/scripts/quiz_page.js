$(() => {
  const url = window.location.href;

  const quiz_id_array = url.replace('?','').split('/');

  const quiz_id = Number(quiz_id_array[quiz_id_array.length - 1]);

  getMyDetails()
    .then(function (json) {

      if (json.user) {

        // console.log(quiz_id_array)
        // console.log('quiz_page getQuiz',quiz_id)
        getQuiz(quiz_id)
        .then(json => {
          // console.log('res' , json);

          const userId = json.user_id;
          const quiz = json.quiz;
          const questionsArray = json.questions;
          const answersArray = json.answers;

          // console.log("asdf", quiz)

    //       const createQuizAnswerElement = function (answer) {

    //         return `
    //     <option value="${answer.id}">${answer.title}</option>
    //     `;

    //       };

    //       const createQuizQuestionElement = function (question) {

    //         return `
    //     <article class='quiz-individual-questions'>
    //      <h3>${question.title}</h3>
    //      <div>
    //        <select name='answer' id='answer-section-for-question${question.id}'>


    //        </select>
    //      </div>
    //      </article>
    //     `;

    //       };

    //       const $quiz = $(`


    //   <form id="doing-quiz-form" class="doing-quiz-form">

    //     <h1>
    //       ${quiz.title}
    //     </h1>

    //     <h3>
    //      ${quiz.description}
    //     </h3>

    //     <div class='question-wrapper' id='quiz${quiz.id}'>



    //     </div>

    //     <div class="quiz__field-wrapper">
    //       <button type="submit" id="quiz_submit">Submit</button>
    //     </div>

    //   </form>
    //  `);
    //------------------------------------------------------------------------------------------------------//

    //       const createQuizAnswerElement = function (answer) {
    // //     <option value="${answer.id}">${answer.title}</option>
    //         return `
    //         <label class="options">${answer.title}<input type="radio" name="answer" value="${answer.id}"> <span class="checkmark"></span> </label>
    //         `;
    //       };

    //       const createQuizQuestionElement = function (question) {

    //             //     <article class='quiz-individual-questions'>
    // //      <h3>${question.title}</h3>
    // //      <div>
    // //        <select name='answer' id='answer-section-for-question${question.id}'>


    // //        </select>
    // //      </div>
    // //      </article>
    //         return `
    //         <div class="question ml-sm-5 pl-sm-5 pt-2" "quiz-individual-questions">
    //     <div class="py-2 h5"><b>${question.title}</b></div>
    //     <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="answer-section-for-question${question.id}"></div>
    //        </div>
    //         `;
    //       };

    //       const $quiz = $(`
    //       <form id="doing-quiz-form" class="doing-quiz-form">
    //       <h1>
    //         ${quiz.title}
    //       </h1>

    //       <h3>
    //         ${quiz.description}
    //       </h3>

    //       <div class="container mt-sm-5 my-1" id="quiz${quiz.id}">


    //       </div>
    //       <div class="quiz__field-wrapper">
    //       <button type="submit" id="quiz_submit">Submit</button>
    //     </div>
    //       </form>
    //       `);

          // console.log('quizhtml' , $quiz);

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

            // console.log($(this));
            let answers = $(this).serialize();
            // answers.quiz_id = quiz_id;
            answers = `quizId=${quiz_id}&` + answers;

            // const data = {quiz_id: quiz_id, answers};

            // console.log($(this));
            console.log(answers)
            // createQuiz(data)
            createUserAnswer(answers)
              .then(result => {

                console.log('quizpage', result);
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
