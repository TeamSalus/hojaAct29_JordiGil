/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const showQuestion = (pregunta) => {
  const divPreguntas = document.getElementById('preguntas');

  const templatePreguntas = Handlebars.templates['preguntas.hbs'];

  divPreguntas.innerHTML = templatePreguntas(pregunta);

  const btnRespuestas = document.getElementById('respuestas');
  btnRespuestas.addEventListener('click', controller.isAnswer);
};

const view = {
  showQuestion,
};
