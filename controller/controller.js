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

Controller.getNextQuestion = async (difficulty) => {
    const { response_code: errorAPI, results: pregunta } = await API.getQuestions(
        difficulty,
        User.getUserToken('token')
    );

    Game.setCorrectAnswer(pregunta[0].correct_answer);

    if (errorAPI === 4) Controller.tokenReset();

    return pregunta[0];
};

Controller.renderQuestion = async () => {
    const difficulty = User.getUserDifficulty() || Game.getDefaultDifficulty();

    let pregunta = await Controller.getNextQuestion(difficulty);

    pregunta = Util.preparaPreguntaParaVista(pregunta);

    UI.showQuestion(pregunta);
    DB.saveDB();
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
        Game.resetGame();
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

    const notificacion = isAcertada ? UI.showSuccess(isLogro, categoria) : UI.showFail(respuestaCorrecta);
    const nextQuestion = [await preload, await notificacion][0];

    UI.showQuestion(nextQuestion);
};
