const Game = {};

Game.difficulty = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
    RANDOM: '',
};

Game.getDefaultDifficulty = () => Object.values(Game.difficulty)[0];

Game.getSavedVersion = () => {
    localStorage.getItem('TriviaVersion');
};

Game.setRunning = () => {
    localStorage.setItem('TriviaRunning', true);
};

Game.isGameRunning = () =>
    localStorage.getItem('TriviaRunning') === null ? false : atob(localStorage.getItem('TriviaRunning'));

Game.setTotalCategories = (totalCategories) => {
    localStorage.setItem('TriviaTotalCategories', totalCategories);
};

Game.setCategories = (categories) => localStorage.setItem('triviaCategories', JSON.stringify(categories));

Game.saveCategories = (categories) => localStorage.setItem('triviaCategories', JSON.stringify(categories));

Game.getSavedCategories = () => JSON.parse(localStorage.getItem('triviaCategories'));

Game.removeCategory = (category, listCategories) => {
    const updatedList = listCategories.filter((_category) => _category.name !== category);
    Game.saveCategories(updatedList);
};

Game.setLevel = (level) => {
    // eslint-disable-next-line no-undef
    User.setUserDifficulty(level);
};

Game.setNextLevel = () => {
    const btnNivel = document.getElementById('btnNivel');
    const actualLevel = btnNivel.textContent;
    const levelIndex = Object.keys(Game.difficulty).findIndex((levels) => levels === actualLevel.toUpperCase());
    const { length } = Object.keys(Game.difficulty);
    const nextLevelIndex = levelIndex === length - 1 ? 0 : levelIndex + 1;
    const nextLevel = Object.values(Game.difficulty)[nextLevelIndex];

    btnNivel.textContent = Object.keys(Game.difficulty)[nextLevelIndex];
    Game.setLevel(nextLevel);
};

Game.setCorrectAnswer = (alreadyEncodedcorrectAnswer) =>
    localStorage.setItem('TriviaCorrectAnswer', alreadyEncodedcorrectAnswer);

Game.getCorrectAnswer = () => atob(localStorage.getItem('TriviaCorrectAnswer'));

Game.saveProgress = () => {
    const preguntasAcertadas = document.getElementById('preguntasAcertadas').textContent;
    const preguntasRespondidas = document.getElementById('preguntasRespondidas').textContent;
    const logrosConseguidos = document.getElementById('logrosConseguidos').textContent;

    localStorage.setItem('TriviaPreguntasAcertadas', btoa(preguntasAcertadas));
    localStorage.setItem('TriviapreguntasRespondidas', btoa(preguntasRespondidas));
    localStorage.setItem('TrivialogrosConseguidos', btoa(logrosConseguidos));
};

Game.resetGame = () => {
    localStorage.removeItem('TriviaPreguntasAcertadas');
    localStorage.removeItem('TriviapreguntasRespondidas');
    localStorage.removeItem('TrivialogrosConseguidos');
    localStorage.removeItem('TriviaRunning');
    localStorage.removeItem('TriviaCategories');
};

Game.getProgress = () => {
    const progress = {
        preguntasAcertadas: atob(localStorage.getItem('TriviaPreguntasAcertadas')),
        preguntasRespondidas: atob(localStorage.getItem('TriviapreguntasRespondidas')),
        logrosConseguidos: atob(localStorage.getItem('TrivialogrosConseguidos')),
    };
    const nivelSeleccionado = localStorage.getItem('TriviaDifficulty') || Game.getDefaultDifficulty();

    const totalCategories = localStorage.getItem('TriviaTotalCategories');

    return { ...progress, nivelSeleccionado, totalCategories };
};
