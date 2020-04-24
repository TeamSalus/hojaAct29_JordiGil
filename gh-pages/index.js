/* eslint-disable no-undef */

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

const preparaPregunta = (question) => {
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

const main = async () => {
  const numero = 0;

  const difficulty = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
  };

  //   const { token } = await model.getToken();
  //   const { results: questions } = await model.getQuestions(difficulty.EASY, token);
  //   const questions = [
  //     {
  //       category: 'Science & Nature',
  //       type: 'multiple',
  //       difficulty: 'easy',
  //       question: 'Which element has the chemical symbol &#039;Fe&#039;?',
  //       correct_answer: 'Iron',
  //       incorrect_answers: ['Gold', 'Silver', 'Tin'],
  //     },
  //   ];

  const questions = [
    {
      category: 'Science & Nature',
      type: 'multiple',
      difficulty: 'easy',
      question: 'Which element has the chemical symbol &#039;Fe&#039;?',
      correct_answer: 'Iron',
      incorrect_answers: ['Gold', 'Silver', 'Tin'],
    },
  ];
  const pregunta = preparaPregunta(questions[numero]);

  view.showQuestion(pregunta);
};
main();
