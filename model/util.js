const randomizeAnswers = (answers) =>
  answers.sort(() => {
    let random;
    do {
      random = Math.round(Math.random() * 4);
    } while (random === 4);
    if (random === 1) return -1;
    if (random === 2) return 0;
    return 1;
  });

const preparaPreguntaParaVista = (question) => {
  let answers = [...question.incorrect_answers, question.correct_answer];
  answers = randomizeAnswers(answers);
  const trueFalse = question.type === 'boolean';
  return {
    category: question.category,
    trueFalse,
    difficulty: question.difficulty,
    question: question.question,
    answer1: answers[0],
    answer2: answers[1],
    answer3: trueFalse ? null : answers[2],
    answer4: trueFalse ? null : answers[3],
  };
};

// eslint-disable-next-line no-unused-vars
const util = {
  randomizeAnswers,
  preparaPreguntaParaVista,
};
