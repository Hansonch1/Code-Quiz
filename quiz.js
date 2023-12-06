let questions = [
    {
        question: "What is the correct way to write a JavaScript array?",
        options: ["var colors = 'red', 'green', 'blue'", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", "var colors = (1:'red', 2:'green', 3:'blue')", "var colors = ['red', 'green', 'blue']"],
        answer: 4
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<javascript>", "<js>", "<scripting>", "<script>"],
        answer: 4
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        options: ["msg('Hello World')", "alertBox('Hello World')", "alert('Hello World')", "msgBox('Hello World')"],
        answer: 3
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function = myFunction()", "function myFunction()", "function:myFunction()", "myFunction function()"],
        answer: 2
    },
    {
        question: "How to write an IF statement in JavaScript?",
        options: ["if i = 5", "if i == 5 then", "if (i == 5)", "if i = 5 then"],
        answer: 3
    },
    {
        question: "How does a WHILE loop start?",
        options: ["while (i <= 10)", "while i = 1 to 10", "while (i <= 10; i++)", "while i <= 10"],
        answer: 1
    },
    {
        question: "How can you add a comment in a JavaScript?",
        options: ["<!--This is a comment-->", "'This is a comment", "//This is a comment", "* This is a comment"],
        answer: 3
    }
    // Add more questions as needed
];
let currentQuestion = 0;
let score = 0;
let timeLeft = 60; // 1 minute
let timer;

function startQuiz() {
    document.getElementById('start').style.display = 'none'; // Hide start button
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById('timer').innerText = 'Time left: ' + timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
    showQuestion();
}

function showQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question').innerText = question.question;
    for (let i = 1; i <= 4; i++) {
        document.getElementById('option' + i).innerText = question.options[i - 1];
    }
}

function checkAnswer(option) {
    if (option === questions[currentQuestion].answer) {
        score++;
    } else {
        timeLeft -= 10; // Subtract 10 seconds for incorrect answer
        if (timeLeft < 0) timeLeft = 0; // Ensure time doesn't go into negative
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById('timer').innerText = '';
    document.getElementById('scores').innerText = 'Your score: ' + score;
    saveScore();
}

function saveScore() {
    let initials = prompt("Enter your initials:");
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push({ initials: initials, score: score });
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 5); // Keep top 5
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

for (let i = 1; i <= 4; i++) {
    document.getElementById('option' + i).addEventListener('click', function() {
        checkAnswer(i);
    });
}

document.getElementById('start').addEventListener('click', startQuiz);
