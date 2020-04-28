const API = {};

API.getToken = async () => {
    const { token } = await (
        await fetch('https://opentdb.com/api_token.php?command=request')
    ).json();
    return token;
};

// eslint-disable-next-line no-undef
API.getQuestions = async (difficulty = Game.getDefaultDifficulty(), token = '') =>
    (
        await fetch(
            `https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&token=${token}&encode=base64`
        )
    ).json();

API.getCategories = async () => (await fetch('https://opentdb.com/api_category.php')).json();
