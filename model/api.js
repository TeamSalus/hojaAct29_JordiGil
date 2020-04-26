/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// prettier-ignore

const getToken = async () => {
  const { token } = await (await fetch('https://opentdb.com/api_token.php?command=request')).json();
  return token;
}

const getQuestions = async (difficulty = game.defaultDifficulty, token = '') =>
  (
    await fetch(
      `https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&token=${token}&encode=base64`
    )
  ).json();

const getCategories = async () => (await fetch('https://opentdb.com/api_category.php')).json();

const api = {
  getToken,
  getQuestions,
  getCategories,
};
