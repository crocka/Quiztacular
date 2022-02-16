$(() => {

  getAllQuizzes()
    .then(json => {

      // console.log('quizindex',json);
      quizLists.addQuizzes(json)
      views_manager.show('quiz_list');

    })
});

// $(() => {
//   getAllListings().then(function( json ) {
//     propertyListings.addProperties(json.properties);
//     views_manager.show('listings');
//   });
// });
