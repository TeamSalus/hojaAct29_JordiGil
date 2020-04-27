const DB = {};

DB.data = {
    gameVersion: 'v2',
    token: '',
    isGameRunning: false,
    gameDifficulty: null,
    totalCategories: 0,
    unlockedCategories: [],
    preguntasRespondidas: 0,
    preguntasAcertadas: 0,
    logrosConseguidos: 0,
};

// eslint-disable-next-line no-return-assign
DB.loadDB = async () => {
    const data = localStorage.getItem(`trivia${DB.data.gameVersion}`);

    if (data) {
        const decodedData = await JSON.parse(atob(data));
        DB.data = { ...DB.data, ...decodedData };
        return true;
    }

    return false;
};

DB.saveDB = () => localStorage.setItem(`trivia${DB.data.gameVersion}`, btoa(JSON.stringify(DB.data)));
