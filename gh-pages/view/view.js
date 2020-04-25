/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const disableButtons = () => {
  const buttons = document.querySelectorAll('.btnAnswer');

  [...buttons].forEach((button) => (button.disabled = true));
};

const showQuestion = (pregunta) => {
  const divPreguntas = document.getElementById('preguntas');
  const templatePreguntas = Handlebars.templates['preguntas.hbs'];

  divPreguntas.innerHTML = templatePreguntas(pregunta);

  const btnRespuestas = document.getElementById('respuestas');
  btnRespuestas.addEventListener('click', controller.isAnswer);
};

const updateAvailableLogros = (numeroCategorias) => {
  const logrosDisponibles = document.getElementById('logrosDisponibles');
  logrosDisponibles.textContent = numeroCategorias;
};

const resumeMarcador = (
  preguntasAcertadas,
  preguntasRespondidas,
  logrosConseguidos,
  logrosDisponibles,
  nivelSeleccionado
) => {
  document.getElementById('preguntasAcertadas').textContent = preguntasAcertadas;
  document.getElementById('preguntasRespondidas').textContent = preguntasRespondidas;
  document.getElementById('logrosConseguidos').textContent = logrosConseguidos;
  document.getElementById('logrosDisponibles').textContent = logrosDisponibles;
  document.getElementById('btnNivel').textContent = nivelSeleccionado.toUpperCase();
};

const updateMarcador = (acertada, isLogro) => {
  const total = document.getElementById('preguntasRespondidas');
  total.textContent = Number(total.textContent) + 1;

  const totalSuccess = document.getElementById('preguntasAcertadas');
  if (acertada) totalSuccess.textContent = Number(totalSuccess.textContent) + 1;

  if (isLogro) {
    const logrosConseguidos = document.getElementById('logrosConseguidos');
    logrosConseguidos.textContent = Number(logrosConseguidos.textContent) + 1;
  }
};

const resetMarcador = () => {
  document.getElementById('preguntasRespondidas').textContent = 0;
  document.getElementById('preguntasAcertadas').textContent = 0;
  document.getElementById('logrosConseguidos').textContent = 0;
};

const showSuccess = async (isLogro, categoria) => {
  const notifier = new AWN({
    position: 'bottom-right',
    durations: {
      success: 2000,
      info: 2000,
    },
    labels: {
      success: 'Acertaste ! ! !',
      info: 'Logro Conseguido',
    },
  });
  notifier.success('Loading next question...');
  if (isLogro)
    setTimeout(() => {
      notifier.info(`${categoria}`);
    }, 1000);
  return new Promise((resolve) => setTimeout(resolve, isLogro ? 3000 : 2000));
};
const showFail = async (respuestaCorrecta) => {
  const notifier = new AWN({
    position: 'bottom-right',
    durations: {
      warning: 2000,
      info: 2000,
    },
    labels: {
      warning: 'Fallaste ! ! !',
      info: 'La respuesta era:',
    },
  });

  notifier.warning('Loading next question...');
  setTimeout(() => {
    notifier.info(respuestaCorrecta);
  }, 1000);
  return new Promise((resolve) => setTimeout(resolve, 3000));
};

const showVictory = async () => {
  const preguntasAcertadas = Number(document.getElementById('preguntasAcertadas').textContent);
  const preguntasRespondidas = Number(document.getElementById('preguntasRespondidas').textContent);

  const notifier = new AWN();
  const onOk = () => {
    notifier.info('Reinicando juego...', {
      durations: {
        info: 3000,
      },
    });
    setTimeout(() => {
      view.resetMarcador();
      controller.gameInit();
      controller.renderQuestion();
    }, 2000);
  };
  notifier.confirm(
    `Enhorabuena!!! <br></br>Conseguiste un ${(
      (preguntasAcertadas / preguntasRespondidas) *
      100
    ).toFixed(0)}% de aciertos. <br></br>Pulsa Ok para reiniciar el juego`,
    onOk,
    false,
    {
      labels: {
        confirm: 'Juego Completado',
      },
      icons: {
        confirm: 'trophy',
      },
    }
  );
};

const btnNivel = document.getElementById('btnNivel');
btnNivel.addEventListener('click', game.setNextLevel);
const view = {
  showQuestion,
  showSuccess,
  showFail,
  updateMarcador,
  updateAvailableLogros,
  showVictory,
  resetMarcador,
  disableButtons,
  resumeMarcador,
};
