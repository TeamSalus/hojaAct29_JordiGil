/* eslint-disable no-undef */

const main = async () => {
  await controller.gameInit();
  await controller.userInit();
  controller.renderQuestion();
};
main();
