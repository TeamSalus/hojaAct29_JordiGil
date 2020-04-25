/* eslint-disable no-undef */

const main = async () => {
  const difficulty = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
  };
  controller.gameInit();
  controller.userInit(difficulty.EASY);
  controller.renderQuestion();
};
main();
