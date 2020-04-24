const showQuestion = (pregunta) => {
  const divPreguntas = document.getElementById('preguntas');
  const templatePreguntas = Handlebars.templates['preguntas.hbs'];

  // eslint-disable-next-line no-undef
  divPreguntas.innerHTML = templatePreguntas(pregunta);
};

const view = {
  showQuestion,
};
