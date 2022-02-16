$(() => {

  const $quizLists = $(`
  <section class="quizLists" id="quizLists">
      <p>Loading...</p>
  </section>
  `);

  window.$quizLists = $quizLists;


  function addQuiz(quiz) {
    $quizLists.append(quiz);
  }

  function clearQuizzes() {
    $quizLists.empty();
  }

  window.quizLists = {};
  window.quizLists.clearQuizzes = clearQuizzes;

  function addQuizzes(quizzes) {
    clearQuizzes();
    for (const quiz of quizzes) {
      // const quiz = quizzes[quizId];
      const quizHtml = quizList.createQuiz(quiz,true);
      addQuiz(quizHtml);
    }
  }
  window.quizLists.addQuizzes = addQuizzes;

  function addMyQuizzes(quizzes) {
    clearQuizzes();

    for (const quiz of quizzes) {
      // const quiz = quizzes[quizId];
      const quizHtml = quizList.createQuiz(quiz,false);
      addQuiz(quizHtml);
    }

  }

  window.quizLists.addMyQuizzes = addMyQuizzes;

  $('body').on('click','.fa-solid fa-share', function() {

    let url = $(this).parent().attr('id');
    alert('Share link copied to your clipboard.');

    navigator.clipboard.writeText(`http://localhost:8080/quiz/${url}`)
      .then(() => {

        alert('Share link copied to your clipboard.');

      })

  });

});


// $(() => {

//   const $propertyListings = $(`
//   <section class="property-listings" id="property-listings">
//       <p>Loading...</p>
//     </section>
//   `);
//   window.$propertyListings = $propertyListings;

//   window.propertyListings = {};

//   function addListing(listing) {
//     $propertyListings.append(listing);
//   }
//   function clearListings() {
//     $propertyListings.empty();
//   }
//   window.propertyListings.clearListings = clearListings;

//   function addProperties(properties, isReservation = false) {
//     clearListings();
//     for (const propertyId in properties) {
//       const property = properties[propertyId];
//       const listing = propertyListing.createListing(property, isReservation);
//       addListing(listing);
//     }
//   }
//   window.propertyListings.addProperties = addProperties;

// });
