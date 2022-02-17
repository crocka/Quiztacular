$(() => {
  const url = window.location.href;

  const result_id_array = url.split('/')

  const result_id = result_id_array[result_id_array.length - 1];


  // getMyDetails()
  // .then(function (j) {

    getResult(result_id)
    .then((json) => {

      // { "username": user.name, "quiz": quiz.title, "score": result.score, "started_at": result.started_at, "completed_at": result.completed_at }
      const username = json.username;
      const quizTitle = json.quiz;
      const score = json.score;
      // const started_at = json.started_at;
      const completed_at = json.completed_at;

      // const $result = $(`

      // <h3>Congratulations, ${username}!!</h3>

      // <h6>You have completed the ${quizTitle} quiz on ${completed_at} and scored ${score}% !</h6>

      // <button id='shareButtonResult'>Share</button>


      // `);

      const $result = $(`

      <html>
    <head>
        <style type='text/css'>
            body, html {
                margin: 0;
                padding: 0;
            }
            body {
                color: black;
                display: table;
                font-family: Georgia, serif;
                font-size: 24px;
                text-align: center;
            }
            .container {
                border: 20px solid tan;
                width: 750px;
                height: 563px;
                display: table-cell;
                vertical-align: middle;
            }
            .logo {
                color: tan;
            }

            .marquee {
                color: tan;
                font-size: 48px;
                margin: 20px;
            }
            .assignment {
                margin: 20px;
            }
            .person {
                border-bottom: 2px solid black;
                font-size: 32px;
                font-style: italic;
                margin: 20px auto;
                width: 400px;
            }
            .reason {
                margin: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
              Congratulations, ${username}!
            </div>

            <div class="marquee">
                You scored ${score}%
            </div>

            <div class="assignment">
                On the
            </div>

            <div class="person">
              ${quizTitle} quiz
            </div>

            <div class="reason">
                Completion date<br/>
                ${completed_at}
            </div>
            <button id='shareButtonResult'>Share</button>
        </div>

    </body>
</html>
      `);

      window.$result = $result;
      $('#main-content').append($result);

      $('body').on('click','#shareButtonResult', function() {

        console.log(json)

        navigator.clipboard.writeText(url)
          .then(() => {

            alert('Share link copied to your clipboard.');

          })

      });


    })

  // })
  // .catch(err => console.log(err));

});
