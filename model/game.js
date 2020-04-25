/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const difficulty = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  RANDOM: '',
};

const setRunning = () => {
  localStorage.setItem('TriviaRunning', true);
};

const setTotalCategories = (totalCategories) => {
  localStorage.setItem('TriviaTotalCategories', totalCategories);
};

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

const saveProgress = () => {
  const preguntasAcertadas = document.getElementById('preguntasAcertadas').textContent;
  const preguntasRespondidas = document.getElementById('preguntasRespondidas').textContent;
  const logrosConseguidos = document.getElementById('logrosConseguidos').textContent;

  localStorage.setItem('TriviaPreguntasAcertadas', preguntasAcertadas);
  localStorage.setItem('TriviapreguntasRespondidas', preguntasRespondidas);
  localStorage.setItem('TrivialogrosConseguidos', logrosConseguidos);
};

const resetGame = () => {
  localStorage.removeItem('TriviaPreguntasAcertadas', preguntasAcertadas);
  localStorage.removeItem('TriviapreguntasRespondidas', preguntasRespondidas);
  localStorage.removeItem('TrivialogrosConseguidos', logrosConseguidos);
  localStorage.removeItem('TriviaRunning', false);
};

const isGameRunning = () => localStorage.getItem('TriviaRunning');

const getProgress = () => {
  const preguntasAcertadas = localStorage.getItem('TriviaPreguntasAcertadas');
  const preguntasRespondidas = localStorage.getItem('TriviapreguntasRespondidas');
  const logrosConseguidos = localStorage.getItem('TrivialogrosConseguidos');
  const logrosDisponibles = localStorage.getItem('TriviaTotalCategories');
  const nivelSeleccionado = localStorage.getItem('TriviaDifficulty');

  return {
    preguntasAcertadas,
    preguntasRespondidas,
    logrosConseguidos,
    logrosDisponibles,
    nivelSeleccionado,
  };
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
};
