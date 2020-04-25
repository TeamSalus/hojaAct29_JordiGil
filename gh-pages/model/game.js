/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const difficulty = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  RANDOM: '',
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

const game = {
  saveCategories,
  getSavedCategories,
  removeCategory,
  setNextLevel,
};
