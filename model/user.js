const User = {};

User.setUserDifficulty = (difficulty) => localStorage.setItem('TriviaDifficulty', difficulty);

User.getUserDifficulty = () => localStorage.getItem('TriviaDifficulty');

User.setUserToken = (token) => {
    localStorage.setItem('TriviaToken', token);
};

User.getUserToken = () => localStorage.getItem('TriviaToken');
