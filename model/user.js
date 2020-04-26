const setUserDifficulty = (difficulty) => localStorage.setItem('TriviaDifficulty', difficulty);

const getUserDifficulty = () => localStorage.getItem('TriviaDifficulty');

const setUserToken = (token) => {
  localStorage.setItem('TriviaToken', token);
};

const getUserToken = () => localStorage.getItem('TriviaToken');

// eslint-disable-next-line no-unused-vars
const user = {
  setUserToken,
  getUserToken,
  setUserDifficulty,
  getUserDifficulty,
};
