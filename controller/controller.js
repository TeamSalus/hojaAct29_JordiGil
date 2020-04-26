/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const gameInit = async () => {
  if (game.isGameRunning()) view.resumeMarcador(game.getProgress());
  else {
    const { trivia_categories: categories } = await api.getCategories();
    game.saveCategories(categories);
    game.setTotalCategories(categories.length);
    game.setRunning();
    view.updateAvailableLogros(categories.length);
  }
};

const userInit = async (difficulty = 'easy') => {
  const token = user.getUserToken() || (await api.getToken());
  user.setUserToken(token);
  if (user.getUserDifficulty() === null) user.setUserDifficulty(difficulty);
};

const tokenReset = async () => {
  user.setUserToken(await api.getToken());
};

const getNextQuestion = async (difficulty) => {
  let { response_code: errorApi, results: pregunta } = await api.getQuestions(
    difficulty,
    user.getUserToken('token')
  );

  respuestaCorrecta = pregunta[0].correct_answer;

  if (errorApi === 4) tokenReset(token);

  return pregunta[0];
};

const renderQuestion = async () => {
  const difficulty = localStorage.getItem('TriviaDifficulty');

  let pregunta = await getNextQuestion(difficulty);
  pregunta = util.preparaPreguntaParaVista(pregunta);

  view.showQuestion(pregunta);
};

const preloadQuestion = async (difficulty) => {
  let pregunta = await getNextQuestion(difficulty);

  pregunta = util.preparaPreguntaParaVista(pregunta);
  return pregunta;
};

const isLogroUnlocked = () => {
  const categoria = document.getElementById('categoria').textContent;
  let listCategories = game.getSavedCategories();

  const isCategoriaUnlocked = listCategories.find((_categoria) => _categoria.name === categoria);
  if (isCategoriaUnlocked === undefined) return { isLogro: false };

  if (listCategories.length === 1) {
    view.showVictory();
    game.resetGame();
    return {
      gameOver: true,
    };
  }

  game.removeCategory(categoria, listCategories);

  return {
    isLogro: true,
    categoria,
  };
};

const isAnswer = async ({ target }) => {
  view.disableButtons();
  const isAcertada = target.innerHTML === respuestaCorrecta;

  const { gameOver, isLogro, categoria } = isAcertada ? isLogroUnlocked() : false;

  if (gameOver) return;

  view.updateMarcador(isAcertada, isLogro);
  game.saveProgress();
  const preload = preloadQuestion(user.getUserDifficulty());

  const notificacion = isAcertada
    ? view.showSuccess(isLogro, categoria)
    : view.showFail(respuestaCorrecta);
  const nextQuestion = [await preload, await notificacion][0];

  view.showQuestion(nextQuestion);
};

const controller = {
  userInit,
  tokenReset,
  getNextQuestion,
  renderQuestion,
  isAnswer,
  preloadQuestion,
  gameInit,
};
