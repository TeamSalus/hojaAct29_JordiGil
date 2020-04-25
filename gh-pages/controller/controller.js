/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const userInit = async () => {
  const token = user.getUserToken() ? user.getUserToken() : await api.getToken();
  user.setUserToken(token);
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

const renderQuestion = async (difficulty) => {
  let pregunta = await getNextQuestion(difficulty);
  pregunta = util.preparaPreguntaParaVista(pregunta);
  view.showQuestion(pregunta);
};

const isAnswer = ({ target }) => target.innerHTML === respuestaCorrecta;

const controller = {
  userInit,
  tokenReset,
  getNextQuestion,
  renderQuestion,
  isAnswer,
};
