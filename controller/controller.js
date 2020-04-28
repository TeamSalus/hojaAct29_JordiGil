/* eslint-disable no-undef */

const Controller = {};

Controller.initGame = async () => {
    await DB.loadDB();
    if (Game.isGameRunning()) UI.resumeMarcador(Game.getProgress());
    else {
        const { trivia_categories: categories } = await API.getCategories();
        Game.setCategories(categories);
        Game.setTotalCategories(categories.length);
        Game.setRunning();
        Game.saveProgress();
        UI.updateAvailableLogros(categories.length);
    }
};

Controller.initUser = async (difficulty = 'easy') => {
    const token = User.getUserToken() || (await API.getToken());
    User.setUserToken(token);
    if (User.getUserDifficulty() === null) User.setUserDifficulty(difficulty);
};

Controller.tokenReset = async () => {
    User.setUserToken(await API.getToken());
};
// prettier-ignore
Controller.getNextCategory = () => {
    const randomCat = Math.round(Math.random() * ((DB.data.unlockedCategories).length - 1));
    return DB.data.unlockedCategories[randomCat].id;
}

Controller.getNextQuestion = async (difficulty) => {
    const category = DB.data.isFastMode ? Controller.getNextCategory() : '';
    const { response_code: errorAPI, results: pregunta } = await API.getQuestions(
        difficulty,
        User.getUserToken('token'),
        category
    );

    if (errorAPI === 3 || errorAPI === 4) {
        Controller.tokenReset();
    } else {
        Game.setCorrectAnswer(pregunta[0].correct_answer);
        return pregunta[0];
    }
    return false;
};

Controller.restartGame = () => {
    Game.resetGame();
    Controller.initGame();
    Controller.initUser();
    Controller.renderQuestion();
};

Controller.renderQuestion = async () => {
    const difficulty = User.getUserDifficulty() || Game.getDefaultDifficulty();
    let pregunta = await Controller.getNextQuestion(difficulty);

    // Si no hay pregunta significa que el Token ha caducado, al voler a requerir regeneramos Token
    if (!pregunta) await Controller.getNextQuestion(difficulty);

    /* Si vuele a no ver pregunta significaría que hay algún error que no he controlado y para evitar
        un bucle infinito y evitar baneos del servidor, reseteamos el juego.
     */
    if (!pregunta) Controller.restartGame();
    else {
        pregunta = Util.preparaPreguntaParaVista(pregunta);
        UI.showQuestion(pregunta);
        DB.saveDB();
    }
};

Controller.preloadQuestion = async (difficulty) => {
    let pregunta = await Controller.getNextQuestion(difficulty);

    pregunta = Util.preparaPreguntaParaVista(pregunta);
    return pregunta;
};

Controller.isLogroUnlocked = () => {
    const categoria = document.getElementById('categoria').textContent;
    const listCategories = Game.getSavedCategories();

    const isCategoriaUnlocked = listCategories.find((_categoria) => _categoria.name === categoria);
    if (isCategoriaUnlocked === undefined) return { isLogro: false };

    if (listCategories.length === 1) {
        UI.showVictory();
        return {
            gameOver: true,
        };
    }

    Game.removeCategory(categoria, listCategories);

    return {
        isLogro: true,
        categoria,
    };
};

Controller.isAnswer = async ({ target }) => {
    UI.disableButtons();
    const respuestaCorrecta = Game.getCorrectAnswer();

    const isAcertada = target.innerHTML === respuestaCorrecta;

    const { gameOver, isLogro, categoria } = isAcertada ? Controller.isLogroUnlocked() : false;

    if (gameOver) return;

    UI.updateMarcador(isAcertada, isLogro);
    Game.saveProgress();
    const preload = Controller.preloadQuestion(User.getUserDifficulty());

    const notificacion = isAcertada
        ? UI.showSuccess(isLogro, categoria)
        : UI.showFail(respuestaCorrecta);
    const nextQuestion = [await preload, await notificacion][0];

    UI.showQuestion(nextQuestion);
};
