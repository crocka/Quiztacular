$(() => {
  const url = window.location.href;

  const result_id_array = url.split('/')

  const result_id = result_id_array[result_id_array.length - 1];

    getResult(result_id)
    .then((json) => {

      const username = json.username;
      const quizTitle = json.quiz;
      const score = json.score;
      const completed_at_Array = json.completed_at.split('T');

      const completed_at = completed_at_Array[0];

      const $result = $(`

      <html>
    <head>
        <style type='text/css'>

            #main-content {
              margin: 5em;
              font-family: 'Zen Kaku Gothic Antique';
              display:flex;
              justify-content: center;
            }

            body, html {
                margin: 0;
                padding: 0;
            }
            body {
                color: black;
                font-family: Georgia, serif;
                font-size: 24px;
                text-align: center;

            }
            .container {
                border: 5px solid #f7cac9;
                width: 750px;
                height: 563px;
                display: table-cell;
                vertical-align: middle;
                background-image: url("https://www.transparenttextures.com/patterns/groovepaper.png");

            }
            .certificatelogo {
                color: #92a8d1;
                margin-top: 3.5em;
                font-weight: bold;
            }

            .marquee {
                color: #92a8d1;
                font-size: 48px;
                margin: 20px;
            }
            .assignment {
                margin: 20px;
                color: #92a8d1;
                font-weight: bold;
            }
            .person {
                border-bottom: 2px solid 	#d0e1ff;
                font-size: 32px;
                font-style: italic;
                margin: 20px auto;
                width: 400px;
                color: #92a8d1;
                font-weight: bold;
            }
            .reason {
                margin: 20px;
                color: #92a8d1;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="certificatelogo">
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
        navigator.clipboard.writeText(url)
          .then(() => {
            alert('Share link copied to your clipboard.');
          })

      });

    })
});
