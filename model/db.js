const DB = {};

DB.data = {
    version: 'v1.0',
    running: Boolean,
    difficulty: String,
    totalCategories: Number,
    unlockedCategories: Object,
    doneQuestions: Number,
    successQuestions: Number,
};

// eslint-disable-next-line no-return-assign
DB.loadDB = () => (DB.data = JSON.parse(atob(localStorage.getItem('openTriviaGame'))));

DB.saveDB = () => localStorage.setItem('openTriviaGame', btoa(JSON.stringify(DB.data)));
