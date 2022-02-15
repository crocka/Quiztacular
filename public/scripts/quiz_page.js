$(() => {

  let questionsArray;
  let answersArray;

  getQuiz()
    .then(json => {
      questionsArray = json.questions;
      answersArray = json.answers;
    })

  const createQuizAnswerElement = function(answer) {

    return `
    <option value="${answer.id}">${answer.title}</option>
    `;

  };

  const createQuizQuestionElement = function(question) {

    return `
    <article class='quiz-individual-questions' id='${question.quiz_id}-${question.id}'>
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
  </from>
  `);

  window.$quiz = $quiz;


  for(let question of questionsArray) {

    $(`#quiz${quiz.id}`).append(createQuizQuestionElement(question));

  };

  for(let answer of answersArray) {

    $(`#answer-section-for-question${answer.question_id}`).append(createQuizAnswerElement(answer));

  };


});
