/* eslint-disable no-undef */

const main = async () => {
  let numeroPregunta = 0;
  let respuestaCorrecta = '';

  const difficulty = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
  };

  controller.userInit();
  controller.renderQuestion(difficulty.EASY);
};
main();

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
