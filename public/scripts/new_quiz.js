$(() => {
  //whether private/public, title, level_of_difficulty, subject-drop down list, description

  let question_number = 0;

  const createAnswerElement = function () {

    return `

    <article class="individual answer_wrapper">
      <input type="text" name="question_answer" placeholder="Enter the answer to the question">

      <input type="checkbox" id="answer_is_correct" name="answer_is_correct" value="True">
      <label for="answer_is_correct">Correct answer</label><br></br>
    </article>

    `;
  };

  const createQuestionElement = function () {
    return `
    <article class="individual_question" id='question${question_number}'>
    <input type="text" name="question_title" placeholder="Enter your question here">

    <div class="individual_answer">

     <article class="individual answer_wrapper">
        <input type="text" name="question_answer" placeholder="Enter the answer to the question">

        <input type="checkbox" id="answer_is_correct" name="answer_is_correct" value="True">
        <label>Correct answer</label><br></br>
     </article>

    </div>

    <div class="add_answer">
      <a button type="button" class="add_button">Add another answer<button>
    </div>

  </article>
    `;
  };
  const $newQuizForm = $(`
  <form id="new-quiz-form" class="new-quiz-form">
      <p>Make a New Quiz</p>

      <div class="new-quiz-form__field-wrapper">
            <input type="text" name="quiz_title" placeholder="What is your quiz title?">
      </div>

      <div class="description">
        <input type="text" name="quiz_description" placeholder="Enter a description of your quiz">
      </div>

      <input type="checkbox" id="quiz_isHidden" name="quiz_isHidden" value="True">
      <label for="quiz_isHidden">Do you want your quiz to be private?</label><br></br>

      <div class="dropdown">
        <button class="dropbtn">Set difficulty level</button>
        <div class="dropdown-difficulty">
          <a href="#">1 - Easy</a>
          <a href="#">2 - Medium</a>
          <a href="#">3 - Hard</a>
        </div>
      </div>

      <div class="dropdown">
        <button class="dropbtn">Subject</button>
        <div class="dropdown-content">
          <a href="#">Math</a>
          <a href="#">Biology</a>
          <a href="#">Chemistry</a>
        </div>
      </div>

      <div class="question_list">

        <article class="individual_question" id='question${question_number}'>
          <input type="text" name="question_title" placeholder="Enter your question here">

          <div class="individual_answer">

           <article class="individual answer_wrapper">
              <input type="text" name="question_answer" placeholder="Enter the answer to the question">

              <input type="checkbox" id="answer_is_correct" name="answer_is_correct" value="True">
              <label>Correct answer</label><br></br>
           </article>

          </div>

          <div class="add_answer">
            <a button type="button" class="add_button">Add another answer<button>
          </div>

        </article>
      </div>

      <div class="add_question">
        <a button type="button" class="add_button">Add another question<button>
      </div>

      <div class="new-quiz-form__field-wrapper">
        <button class="new-quiz-form_create>Create!</button>
        <a button type="button" id="new-quiz-form_cancel "href="#">Cancel</a>
      </div>
  `);

  window.$newQuizForm = $newQuizForm;

  // $newQuizForm.on('submit', function (event) {

  //   event.preventDefault();

  //   const data = $(this).serialize();

  //   createQuiz(data)
  //     .then()
  // });

  $('body').on("click",".add_answer", function (event) {
    event.preventDefault();
    console.log($(this).closest('.individual_question').attr('id'))

    $(`#${$(this).closest('.individual_question').attr('id')} .individual_answer`).append(createAnswerElement());

  });

  $('body').on("click", ".add_question", function (event) {
    event.preventDefault();

    question_number++;
    console.log(question_number)
    $('.question_list').append(createQuestionElement());

  });

  $('body').on('click', '#new-quiz-form_cancel', function () {
    console.log('asdf')
    views_manager.show('quiz_list');
    return false;
  });
});

