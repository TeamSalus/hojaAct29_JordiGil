const Util = {};

Util.randomizeAnswers = (answers) =>
  answers.sort(() => {
    let random;
    do {
      random = Math.round(Math.random() * 4);
    } while (random === 4);
    if (random === 1) return -1;
    if (random === 2) return 0;
    return 1;
  });

Util.preparaPreguntaParaVista = (question) => {
  let answers = [...question.incorrect_answers, question.correct_answer];
  answers = Util.randomizeAnswers(answers);
  const trueFalse = atob(question.type) === 'boolean';
  return {
    category: atob(question.category),
    trueFalse,
    difficulty: atob(question.difficulty),
    question: atob(question.question),
    answer1: atob(answers[0]),
    answer2: atob(answers[1]),
    answer3: trueFalse ? null : atob(answers[2]),
    answer4: trueFalse ? null : atob(answers[3]),
  };
};
