const famousQuotes = [
    "the only place where success comes before work is in the dictionary",
    "life is what happens when you are busy making other plans",
    "in the middle of difficulty lies opportunity",
    "success is going from failure to failure without losing enthusiasm",
    "the best way to predict the future is to create it",
    "do not find fault, find a remedy",
    "persistence is the path to success",
    "to know how to wait is the greatest secret of success",
    "lorem ipsum dolor sit amet consectetur adipiscing elit sed aliquet elementum vulputate integer luctus a enim vel porta nunc ultrices mi ac lectus dignissim vitae aliquam lorem malesuada integer varius suscipit mollis nulla placerat mi vitae gravida blandit est massa lobortis leo vitae tincidunt nunc arcu quis mauris aenean venenatis sapien et magna tempor nec vehicula urna molestie sed sit amet magna non nisi auctor ultrices ac eget sem etiam nulla lorem mattis vitae posuere sed facilisis eu eros nunc fermentum neque quam id ornare massa venenatis non",
	"the quick brown fox jumps over the lazy dog",
	"the greatest glory in living lies not in never falling, but in rising every time we fall",
	"in the end, we will remember not the words of our enemies, but the silence of our friends",
	"the future belongs to those who believe in the beauty of their dreams and who have the courage to pursue them with determination and perseverance",
	"the only limit to our realization of tomorrow is our doubts of today. Let us move forward with strong and active faith"
];

let currentQuote = "";
let inputText = document.getElementById("input-text");
let timerDisplay = document.getElementById("timer");
let scoreDisplay = document.getElementById("score");
let restartButton = document.getElementById("restart-button");

let startTime;
let interval;
let score = 0;

function startTimer() {
    startTime = new Date();
    interval = setInterval(() => {
        const currentTime = new Date();
        const timeElapsed = ((currentTime - startTime) / 1000).toFixed(1);
        timerDisplay.textContent = `Time: ${timeElapsed}s`;
    }, 100);
}

function stopTimer() {
    clearInterval(interval);
}

function getRandomQuote() {
    return famousQuotes[Math.floor(Math.random() * famousQuotes.length)];
}

function updateTextDisplay(input, correctText) {
    let displayText = '';
    for (let i = 0; i < currentQuote.length; i++) {
        if (i < input.length) {
            if (input[i] === currentQuote[i]) {
                displayText += `<span class="correct">${currentQuote[i]}</span>`;
            } else {
                displayText += `<span class="incorrect">${currentQuote[i]}</span>`;
            }
        } else {
            displayText += currentQuote[i];
        }
    }
    document.getElementById("text-to-type").innerHTML = displayText;
}

function checkInput() {
    const input = inputText.value;
    const correctText = currentQuote.substring(0, input.length);
    if (input === currentQuote) {
        stopTimer();
        const timeTaken = ((new Date() - startTime) / 1000).toFixed(1);
        const wordsPerMinute = ((currentQuote.split(' ').length / timeTaken) * 60).toFixed(1);
        score += parseInt(wordsPerMinute);
        scoreDisplay.textContent = `Score: ${score}`;
        inputText.value = "";
        startNewRound();
    }
    updateTextDisplay(input, correctText);
}

function startNewRound() {
    currentQuote = getRandomQuote();
    document.getElementById("text-to-type").innerHTML = currentQuote;
    startTimer();
}

inputText.addEventListener("input", checkInput);
inputText.addEventListener("focus", () => {
    if (!interval) {
        startTimer();
    }
});

restartButton.addEventListener("click", () => {
    location.reload();
});

currentQuote = getRandomQuote();
document.getElementById("text-to-type").innerHTML = currentQuote;
