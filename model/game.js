/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const difficulty = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  RANDOM: '',
};

const versionActual = 'v1.0';

const defaultDifficulty = Object.values(difficulty)[0];

const saveVersion = (version) => {
  localStorage.setItem('TriviaVersion', version);
};

const getSavedVersion = () => {
  localStorage.getItem('TriviaVersion');
};

const setRunning = () => {
  localStorage.setItem('TriviaRunning', true);
};

const isGameRunning = () =>
  localStorage.getItem('TriviaRunning') === null
    ? false
    : atob(localStorage.getItem('TriviaRunning'));

const setTotalCategories = (totalCategories) => {
  localStorage.setItem('TriviaTotalCategories', totalCategories);
};

const setCategories = (categories) =>
  localStorage.setItem('triviaCategories', JSON.stringify(categories));

const saveCategories = (categories) =>
  localStorage.setItem('triviaCategories', JSON.stringify(categories));

const getSavedCategories = () => JSON.parse(localStorage.getItem('triviaCategories'));

const removeCategory = (category, listCategories) => {
  const updatedList = listCategories.filter((_category) => _category.name !== category);
  saveCategories(updatedList);
};

const setLevel = (level) => {
  user.setUserDifficulty(level);
};

const setNextLevel = () => {
  const btnNivel = document.getElementById('btnNivel');
  const actualLevel = btnNivel.textContent;
  const levelIndex = Object.keys(difficulty).findIndex(
    (levels) => levels === actualLevel.toUpperCase()
  );
  const { length } = Object.keys(difficulty);
  const nextLevelIndex = levelIndex === length - 1 ? 0 : levelIndex + 1;
  const nextLevel = Object.values(difficulty)[nextLevelIndex];

  btnNivel.textContent = Object.keys(difficulty)[nextLevelIndex];
  setLevel(nextLevel);
};

const setCorrectAnswer = (alreadyEncodedcorrectAnswer) =>
  localStorage.setItem('TriviaCorrectAnswer', alreadyEncodedcorrectAnswer);
const getCorrectAnswer = () => atob(localStorage.getItem('TriviaCorrectAnswer'));

const saveProgress = () => {
  const preguntasAcertadas = document.getElementById('preguntasAcertadas').textContent;
  const preguntasRespondidas = document.getElementById('preguntasRespondidas').textContent;
  const logrosConseguidos = document.getElementById('logrosConseguidos').textContent;

  localStorage.setItem('TriviaPreguntasAcertadas', btoa(preguntasAcertadas));
  localStorage.setItem('TriviapreguntasRespondidas', btoa(preguntasRespondidas));
  localStorage.setItem('TrivialogrosConseguidos', btoa(logrosConseguidos));
};

const resetGame = () => {
  localStorage.removeItem('TriviaPreguntasAcertadas');
  localStorage.removeItem('TriviapreguntasRespondidas');
  localStorage.removeItem('TrivialogrosConseguidos');
  localStorage.removeItem('TriviaRunning');
  localStorage.removeItem('TriviaRunning');
};

const getProgress = () => {
  const progress = {
    preguntasAcertadas: atob(localStorage.getItem('TriviaPreguntasAcertadas')),
    preguntasRespondidas: atob(localStorage.getItem('TriviapreguntasRespondidas')),
    logrosConseguidos: atob(localStorage.getItem('TrivialogrosConseguidos')),
  };

  nivelSeleccionado = localStorage.getItem('TriviaDifficulty') || defaultDifficulty;
  totalCategories = localStorage.getItem('TriviaTotalCategories');

  return { ...progress, nivelSeleccionado, totalCategories };
};
const game = {
  saveCategories,
  getSavedCategories,
  removeCategory,
  setNextLevel,
  saveProgress,
  resetGame,
  isGameRunning,
  getProgress,
  setTotalCategories,
  setRunning,
  setCorrectAnswer,
  getCorrectAnswer,
  defaultDifficulty,
  saveVersion,
  getSavedVersion,
  versionActual,
};
