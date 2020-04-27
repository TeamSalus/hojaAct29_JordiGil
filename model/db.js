const db = {};

db.data = {
  version: 'v1.0',
  running: Boolean,
  difficulty: String,
  totalCategories: Number,
  unlockedCategories: Object,
  doneQuestions: Number,
  successQuestions: Number,
};

// eslint-disable-next-line no-return-assign
db.loadDB = () => (db.data = JSON.parse(atob(localStorage.getItem('openTriviaGame'))));

db.saveDB = () => localStorage.setItem('openTriviaGame', btoa(JSON.stringify(db.data)));
