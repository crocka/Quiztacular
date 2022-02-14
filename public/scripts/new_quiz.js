$(() => {
  //whether private/public, title, level_of_difficulty, subject-drop down list, description

  let question_number = 0;

  const createAnswerElement = function () {

    return `

    <article class="individual answer_wrapper">
      <input type="text" name="question${question_number}_answer" placeholder="Enter the answer to the question">

      <input type="hidden" id="answer_is_correct" name="question${question_number}answer_is_correct" value="False">
      <input type="checkbox" id="answer_is_correct" name="question${question_number}answer_is_correct" value="True">
      <label>Correct answer</label><br></br>
    </article>

    `;
  };

  const createQuestionElement = function () {
    return `
    <article class="individual_question" id='question${question_number}'>
    <input type="text" name="question_title" placeholder="Enter your question here">

    <div class="individual_answer">

     <article class="individual answer_wrapper">
        <input type="text" name="question${question_number}_answer" placeholder="Enter the answer to the question">

        <input type="checkbox" id="answer_is_correct" name="question${question_number}answer_is_correct" value="True">
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
      <label>Do you want your quiz to be private?</label><br></br>

      <div class="dropdown">
        <label class="dropbtn">Set difficulty level</label>
        <select class="dropdown-difficulty"  id='quiz_level_of_difficulty' name='quiz_level_of_difficulty'>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>

      <div class="dropdown">
        <label class="dropbtn">Subject</label>
        <select class="dropdown-subject" id='quiz_subject' name='quiz_subject'>
          <option>Math</option>
          <option>Biology</option>
          <option>Chemistry</option>
        </select>
      </div>


      <div class="question_list">
        <article class="individual_question" id='question${question_number}'>
          <input type="text" name="question_title" placeholder="Enter your question here">

          <div class="individual_answer">

           <article class="individual answer_wrapper">
              <input type="text" name="question${question_number}_answer" placeholder="Enter the answer to the question">

              <input type="hidden" id="answer_is_correct" name="question${question_number}answer_is_correct" value="False">
              <input type="checkbox" id="answer_is_correct" name="question${question_number}answer_is_correct" value="True">
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
        <button type="submit" id="new-quiz-form_create">Create!</button>
        <a id="new-quiz-form_cancel" href="#">Cancel</a>
      </div>
  `);

  // const organizeData = function(){


  // };

  window.$newQuizForm = $newQuizForm;

  $(".answer_is_correct").on('change', function() {
    if ($(this).is(':checked')) {
      $(this).attr('value', 'true');
    } else {
      $(this).attr('value', 'false');
    }
  });

  $('#quiz_level_of_difficulty').on('change', function() {

    $(this).val($('.dropdown-difficulty').val());

  });

  $('#quiz_subject').on('change', function() {

    $(this).val($('.dropdown-subject').val());

  });


  $newQuizForm.on('submit', function (event) {

    event.preventDefault();

    console.log($(this));
    const data = $(this).serialize();
    console.log($(this).val());
    console.log(data)
    createQuiz(data)
      .then()
  });

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
    views_manager.show('quiz_list');
    return false;
  });
});

