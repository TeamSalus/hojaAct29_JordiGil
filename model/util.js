const Util = {};

Util.randomizeAnswers = (answers) =>
    answers.sort(() => {
        let random;
        do {
            random = Math.round(Math.random() * 4);
        } while (random === 4);
        if (random === 1) return -1;
        if (random === 2) return 0;
        return 1;
    });

Util.b64DecodeUnicode = (palabra) =>
    decodeURIComponent(
        atob(palabra)
            .split('')
            .map((letra) => `%${`00${letra.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
    );

Util.preparaPreguntaParaVista = (question) => {
    let answers = [...question.incorrect_answers, question.correct_answer];
    answers = Util.randomizeAnswers(answers);
    const trueFalse = Util.b64DecodeUnicode(question.type) === 'boolean';
    return {
        category: Util.b64DecodeUnicode(question.category),
        trueFalse,
        difficulty: Util.b64DecodeUnicode(question.difficulty),
        question: Util.b64DecodeUnicode(question.question),
        answer1: Util.b64DecodeUnicode(answers[0]),
        answer2: Util.b64DecodeUnicode(answers[1]),
        answer3: trueFalse ? null : Util.b64DecodeUnicode(answers[2]),
        answer4: trueFalse ? null : Util.b64DecodeUnicode(answers[3]),
    };
};
