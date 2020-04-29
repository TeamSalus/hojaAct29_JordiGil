/* eslint-disable no-undef */
const User = {};

User.setUserDifficulty = (difficulty) => {
    DB.data.gameDifficulty = difficulty;
    DB.saveDB();
};

User.getUserDifficulty = () => DB.data.gameDifficulty;

User.setUserToken = (token) => {
    DB.data.token = token;
    DB.saveDB();
};

User.getUserToken = () => DB.data.token;

User.resetToken = () => {
    DB.data.token = null;
}
