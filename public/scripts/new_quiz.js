$(() => {
  //whether private/public, title, level_of_difficulty, subject-drop down list, description

  let question_number = 0;

  const createAnswerElement = function (question_num) {

    return `

    <article class="individual answer_wrapper">
      <input type="text" name="question${question_num}_answer" placeholder="Enter the answer to the question">

      <input type="hidden" id="answer_is_correct" name="question${question_num}answer_is_correct" value="False">
      <input type="checkbox" id="answer_is_correct" name="question${question_num}answer_is_correct" value="True">
      <label>Correct answer</label><br></br>
    </article>

    `;
  };

  const createQuestionElement = function () {
    return `
    <article class="individual_question" id='${question_number}'>
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
      <a button type="button" class="add_button"><span>Add another answer</span></a>
    </div>



  </article>

  <div class='separator'></div>
    `;
  };
  const $newQuizForm = $(`

  <form id="new-quiz-form" class="new-quiz-form">

      <h3>Make a New Quiz</h3>

      <div class="new-quiz-form__field-wrapper">
            <input type="text" name="quiz_title" placeholder="What is your quiz title?">
      </div>

      <div class="description">
        <input type="text" name="quiz_description" placeholder="Enter a description of your quiz">
      </div>

      <input type="checkbox" id="quiz_isHidden" name="quiz_isHidden" value="True">
      <label>Do you want your quiz to be private?</label><br></br>

      <div class="dropdown">
        <label class="dropbtn">Set difficulty level: </label>
        <select class="dropdown-difficulty"  id='quiz_level_of_difficulty' name='quiz_level_of_difficulty'>
          <option value='1'>Easy</option>
          <option value='2'>Medium</option>
          <option value='3'>Hard</option>
        </select>
      </div>

      <div class="dropdown">
        <label class="dropbtn">Subject: </label>
        <select class="dropdown-subject" id='quiz_subject' name='quiz_subject'>
          <option>Math</option>
          <option>Biology</option>
          <option>Chemistry</option>
          <option>Anatomy and Cell Biology</option>
          <option>Anthropology</option>
          <option>Art History</option>
          <option>Arts & Science</option>
          <option>Astronomy and Astrophysics</option>
          <option>Biochemistry</option>
          <option>Theoretical Astrophysics</option>
          <option>Cell and Systems Biology</option>
          <option>Criminology and Sociolegal Studies</option>
          <option>Diaspora & Transnational Studies</option>
          <option>Drama, Theatre and Performance Studies</option>
          <option>Entrepreneurship</option>
          <option>Ethics</option>
          <option>European, Russian and Eurasian Studies</option>
          <option>Industrial Relations and Human Resources</option>
          <option>Medieval Studies</option>
          <option>Study of United States</option>
          <option>Chemistry</option>
          <option>Cinema Studies</option>
          <option>Classics</option>
          <option>Computer Science</option>
          <option>Contemporary East and Southeast Asian Studies</option>
          <option>Study of Religion</option>
          <option>Earth Sciences</option>
          <option>East Asian Studies</option>
          <option>Ecology and Evolutionary Biology</option>
          <option>Economics</option>
          <option>English</option>
          <option>Music</option>
          <option>French</option>
          <option>Geography and Planning</option>
          <option>Germanic Languages & Literatures</option>
          <option>History</option>
          <option>Human Biology</option>
          <option>Immunology</option>
          <option>Indigenous Studies Arts & Science</option>
          <option>History & Philosophy of Science & Technology</option>
          <option>Italian Studies</option>
          <option>Jewish Studies</option>
          <option>Architecture, Landscape, & Design</option>
          <option>Laboratory Medicine and Pathobiology</option>
          <option>Linguistics</option>
          <option>Mathematics</option>
          <option>Molecular Genetics</option>
          <option>Global Affairs and Public Policy</option>
          <option>Near & Middle Eastern Civilizations</option>
          <option>Nutritional Sciences</option>
          <option>Pharmacology</option>
          <option>Philosophy</option>
          <option>Physics</option>
          <option>Physiology</option>
          <option>Political Science</option>
          <option>Psychology</option>
          <option>Commerce</option>
          <option>Environment</option>
          <option>Sexual Diversity Studies</option>
          <option>Slavic Languages and Literatures</option>
          <option>Sociology</option>
          <option>South Asian Studies</option>
          <option>Spanish and Portuguese</option>
          <option>Statistical Sciences</option>
          <option>Women and Gender Studies</option>
          <option>Applied Science and Engineering</option>
          <option>Chemical Engineering and Applied Chemistry</option>
          <option>Civil and Mineral Engineering</option>
          <option>Engineering Science</option>
          <option>Electrical & Computer Engin.</option>
          <option>Applied Science & Engineering</option>
          <option>Studies in Transdisciplinary Engin Educ & Practice</option>
          <option>Biomedical Engineering</option>
          <option>Materials Science and Engineering</option>
          <option>Mechanical & Industrial Engineering</option>
          <option>Anthropology </option>
          <option>Biological Sciences </option>
          <option>Centre for Teaching and Learning </option>
          <option>Arts, Culture & Media </option>
          <option>Computer & Mathematical Sci </option>
          <option>Historical & Cultural Studies </option>
          <option>Physical & Environmental Sci </option>
          <option>English </option>
          <option>Global Development Studies </option>
          <option>Health and Society </option>
          <option>Human Geography </option>
          <option>Language Studies </option>
          <option>Management </option>
          <option>Philosophy </option>
          <option>Political Science </option>
          <option>Psychology </option>
          <option>Sociology </option>
          <option>Anthropology</option>
          <option>Biology</option>
          <option>Chemical and Physical Sciences</option>
          <option>Economics</option>
          <option>English and Drama</option>
          <option>Geography, Geomatics and Environment</option>
          <option>Historical Studies</option>
          <option>Management and Innovation</option>
          <option>Study of University Pedagogy</option>
          <option>Communication and Culture</option>
          <option>Language Studies</option>
          <option>Management</option>
          <option>Mathematical and Computational Sciences</option>
          <option>Philosophy</option>
          <option>Political Science</option>
          <option>Psychology</option>
          <option>Sociology</option>
          <option>Visual Studies</option>
          <option>Other</option>

        </select>
      </div>


      <div class="question_list">
        <article class="individual_question" id='${question_number}'>
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
            <a button type="button" class="add_button"><span>Add another answer</span></a>
          </div>

          <div class='separator'></div>

        </article>
      </div>

      <div class="add_question">
        <a button type="button" class="add_button"><span>Add another question</span></a>
      </div>

      <div class="new-quiz-form__field-wrapper">
        <button type="submit" id="new-quiz-form_create">Create</button>
        <a id="new-quiz-form_cancel" href="#">Cancel</a>
      </div>

    </form>
  `);

  window.$newQuizForm = $newQuizForm;

  $(".answer_is_correct").on('change', function () {
    if ($(this).is(':checked')) {
      $(this).attr('value', 'true');
    } else {
      $(this).attr('value', 'false');
    }
  });

  $('#quiz_level_of_difficulty').on('change', function () {

    $(this).val($('.dropdown-difficulty').val());

  });

  $('#quiz_subject').on('change', function () {

    $(this).val($('.dropdown-subject').val());

  });

  $('body').on("click", ".add_answer", function (event) {
    event.preventDefault();

    const question_num = $(this).parent('.individual_question').attr('id');

    $(`#${question_num} .individual_answer`).append(createAnswerElement(question_num));

  });

  $('body').on("click", ".add_question", function (event) {
    event.preventDefault();

    question_number++;
    $('.question_list').append(createQuestionElement());

  });

  $('body').on('click', '#new-quiz-form_cancel', function () {
    views_manager.show('quiz_list');
    return false;
  });

  $newQuizForm.on('submit', function (event) {

    event.preventDefault();

    const data = $(this).serialize();

    async function create() {


      await createQuiz(data)

      $.get('/', () => {
        window.location = 'http://localhost:8080/'
        alert('New Quiz Created!');
      })
    };
    create();
  });

});

