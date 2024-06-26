const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

// Fetch questions from JSON or API
fetch("quiz_texts.json")
    .then(response => response.json())
    .then(data => {
        questions = data;
    })
    .catch(error => {
        console.error("Error fetching questions:", error);
    });

document.addEventListener('DOMContentLoaded', () => {
    game.classList.add("hidden");  // Ensure the game is initially hidden
    loader.classList.add("hidden");  // Ensure the loader is initially hidden
    const startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', () => {
        startGame();
        game.classList.remove("hidden");
        loader.classList.add("hidden");
        startBtn.classList.add("hidden");
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const lilyStoryBtn = document.getElementById('lilysStoryBtn'); // Get the Lily's story button

    startBtn.addEventListener('click', () => {
        startGame();
    });

    lilyStoryBtn.addEventListener('click', () => {
        window.location.href = 'environmental.html'; // Redirect to Lily's story
    });
});


function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

const getNewQuestion = () => {
    if (questionCounter >= MAX_QUESTIONS) {
        endGame();
        return; // Make sure no further execution happens after ending the game
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice, index) => {
        choice.innerText = currentQuestion[`choice${index + 1}`];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

const incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

const endGame = () => {
    game.classList.add("hidden");  // Hide the game UI
    document.getElementById('result').classList.remove("hidden");  // Show the results section
    document.getElementById('final-score').innerText = `Your final score is: ${score}`;  // Display final score and end message

    // Add listener to the restart button
    const restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click', restartGame);
};

const restartGame = () => {
    document.getElementById('result').classList.add("hidden");  // Hide the results section
    startGame();
    game.classList.remove("hidden");  // Show the game section
};


const MAX_QUESTIONS = 5;
const CORRECT_BONUS = 10;

