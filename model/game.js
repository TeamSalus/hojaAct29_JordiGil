/* eslint-disable no-undef */
const Game = {};

Game.difficulty = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
    RANDOM: '',
};

Game.getDefaultDifficulty = () => Object.values(Game.difficulty)[0];

Game.setRunning = () => {
    DB.data.isGameRunning = true;
};

Game.isGameRunning = () => DB.data.isGameRunning;

Game.setTotalCategories = (totalCategories) => {
    DB.data.totalCategories = totalCategories;
};

Game.setCategories = (categories) => {
    DB.data.unlockedCategories = categories;
};

Game.getSavedCategories = () => DB.data.unlockedCategories;

Game.removeCategory = (category, listCategories) => {
    const updatedList = listCategories.filter((_category) => _category.name !== category);
    Game.setCategories(updatedList);
};

Game.setLevel = (level) => {
    // eslint-disable-next-line no-undef
    User.setUserDifficulty(level);
};

Game.setNextLevel = () => {
    const btnNivel = document.getElementById('btnNivel');
    const actualLevel = btnNivel.textContent;
    const levelIndex = Object.keys(Game.difficulty).findIndex(
        (levels) => levels === actualLevel.toUpperCase()
    );
    const { length } = Object.keys(Game.difficulty);
    const nextLevelIndex = levelIndex === length - 1 ? 0 : levelIndex + 1;
    const nextLevel = Object.values(Game.difficulty)[nextLevelIndex];

    btnNivel.textContent = Object.keys(Game.difficulty)[nextLevelIndex];
    Game.setLevel(nextLevel);
};

Game.setCorrectAnswer = (correctAnswer) => {
    DB.data.correctAnswer = atob(correctAnswer);
};

Game.getCorrectAnswer = () => DB.data.correctAnswer;

Game.saveProgress = () => {
    const preguntasAcertadas = document.getElementById('preguntasAcertadas').textContent;
    const preguntasRespondidas = document.getElementById('preguntasRespondidas').textContent;
    const logrosConseguidos = document.getElementById('logrosConseguidos').textContent;

    DB.data.preguntasAcertadas = preguntasAcertadas;
    DB.data.preguntasRespondidas = preguntasRespondidas;
    DB.data.logrosConseguidos = logrosConseguidos;
    DB.saveDB();
};

Game.resetGame = () => {
    Object.keys(DB.data).map((key) => {
        if (key !== 'gameVersion') {
            DB.data[key] = null;
        }
        DB.saveDB();
        return true;
    });
};

Game.getProgress = () => {
    const progress = {
        preguntasAcertadas: DB.data.preguntasAcertadas,
        preguntasRespondidas: DB.data.preguntasRespondidas,
        logrosConseguidos: DB.data.logrosConseguidos,
    };
    let nivelSeleccionado;
    switch (DB.data.gameDifficulty) {
        case '':
            nivelSeleccionado = 'RANDOM';
            break;
        case null:
            nivelSeleccionado = Game.getDefaultDifficulty();
            break;

        default:
            nivelSeleccionado = DB.data.gameDifficulty;
            break;
    }

    const { totalCategories } = DB.data;

    return { ...progress, nivelSeleccionado, totalCategories };
};
