$(() => {
  getAllQuizzes()
    .then(json => {
      quizLists.addQuizzes(json)
      views_manager.show('quiz_list');
    })
});

