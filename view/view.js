const UI = {};

UI.disableButtons = () => {
    const buttons = document.querySelectorAll('.btnAnswer');
    [...buttons].forEach((button) => {
        // eslint-disable-next-line no-param-reassign
        button.disabled = true;
    });
};

UI.showQuestion = (pregunta) => {
    const divPreguntas = document.getElementById('preguntas');
    // eslint-disable-next-line no-undef
    const templatePreguntas = Handlebars.templates['preguntas.hbs'];

    divPreguntas.innerHTML = templatePreguntas(pregunta);

    const btnRespuestas = document.getElementById('respuestas');
    // eslint-disable-next-line no-undef
    btnRespuestas.addEventListener('click', Controller.isAnswer);
};

UI.updateAvailableLogros = (numeroCategorias) => {
    const logrosDisponibles = document.getElementById('logrosDisponibles');
    logrosDisponibles.textContent = numeroCategorias;
};

UI.resumeMarcador = ({
    preguntasAcertadas,
    preguntasRespondidas,
    logrosConseguidos,
    totalCategories,
    nivelSeleccionado,
}) => {
    document.getElementById('preguntasAcertadas').textContent = preguntasAcertadas || 0;

    document.getElementById('preguntasRespondidas').textContent = preguntasRespondidas || 0;

    document.getElementById('logrosConseguidos').textContent = logrosConseguidos || 0;

    document.getElementById('logrosDisponibles').textContent = totalCategories;

    document.getElementById('btnNivel').textContent = (nivelSeleccionado || 'RANDOM').toUpperCase();
};

UI.updateMarcador = (acertada, isLogro) => {
    const total = document.getElementById('preguntasRespondidas');
    total.textContent = Number(total.textContent) + 1;

    const totalSuccess = document.getElementById('preguntasAcertadas');
    if (acertada) totalSuccess.textContent = Number(totalSuccess.textContent) + 1;

    if (isLogro) {
        const logrosConseguidos = document.getElementById('logrosConseguidos');
        logrosConseguidos.textContent = Number(logrosConseguidos.textContent) + 1;
    }
};

UI.resetMarcador = () => {
    document.getElementById('preguntasRespondidas').textContent = 0;
    document.getElementById('preguntasAcertadas').textContent = 0;
    document.getElementById('logrosConseguidos').textContent = 0;
};

UI.showSuccess = async (isLogro, categoria) => {
    // eslint-disable-next-line no-undef
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
UI.showFail = async (respuestaCorrecta) => {
    // eslint-disable-next-line no-undef
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

UI.showVictory = async () => {
    const preguntasAcertadas = Number(document.getElementById('preguntasAcertadas').textContent);
    const preguntasRespondidas = Number(document.getElementById('preguntasRespondidas').textContent);

    // eslint-disable-next-line no-undef
    const notifier = new AWN();
    const onOk = () => {
        notifier.info('Reinicando juego...', {
            durations: {
                info: 3000,
            },
        });
        setTimeout(() => {
            UI.resetMarcador();
            // eslint-disable-next-line no-undef
            Controller.initGame();
            // eslint-disable-next-line no-undef
            Controller.renderQuestion();
        }, 2000);
    };
    notifier.confirm(
        `Enhorabuena!!! <br></br>Conseguiste un ${((preguntasAcertadas / preguntasRespondidas) * 100).toFixed(
            0
        )}% de aciertos. <br></br>Pulsa Ok para reiniciar el juego`,
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

UI.btnNivel = document.getElementById('btnNivel');
// eslint-disable-next-line no-undef
UI.btnNivel.addEventListener('click', Game.setNextLevel);
