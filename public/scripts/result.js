$(() => {
  const url = window.location.href;

  const result_id_array = url.split('/')

  const result_id = result_id_array[result_id_array.length - 1];

  getResult(result_id)
    .then((json) => {

      // { "username": user.name, "quiz": quiz.title, "score": result.score, "started_at": result.started_at, "completed_at": result.completed_at }
      const username = json.username;
      const quizTitle = json.quiz;
      const score = json.score;
      // const started_at = json.started_at;
      const completed_at = json.completed_at;

      const $result = $(`

      <h3>Congratulations, ${username}!!</h3>

      <h6>You have completed the ${quizTitle} quiz on ${completed_at} and scored ${score}% !</h6>

      <button id='shareButtonResult'>Share</button>


      `);

      window.$result = $result;
      $('#main-content').append($result);




      $('body').on('click','#shareButtonResult', function() {

        navigator.clipboard.writeText(url)
          .then(() => {

            alert('Share link copied to your clipboard.');

          })

      });


    })
});
