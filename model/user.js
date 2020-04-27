/* eslint-disable no-undef */
const User = {};

User.setUserDifficulty = (difficulty) => {
    DB.data.gameDifficulty = difficulty;
    DB.saveDB();
};

User.getUserDifficulty = () => DB.data.gameDifficulty;

User.setUserToken = (token) => {
    DB.data.token = token;
};

User.getUserToken = () => DB.data.token;
