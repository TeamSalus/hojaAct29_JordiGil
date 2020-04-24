/* eslint-disable no-unused-vars */

// prettier-ignore

const getToken = async () => (await fetch('https://opentdb.com/api_token.php?command=request')).json();
const getQuestions = async (difficulty, token) =>
  (
    await fetch(`https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&token=${token}`)
  ).json();

const model = {
  getToken,
  getQuestions,
};
