/* eslint-disable no-undef */

const main = async () => {
    await Controller.initGame();
    await Controller.initUser();
    Controller.renderQuestion();
};
main();
