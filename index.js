/* eslint-disable no-undef */

const main = async () => {
    DB.data.gameVersion = 'v2';
    await Controller.initGame();
    await Controller.initUser();
    Controller.renderQuestion();
};
main();
