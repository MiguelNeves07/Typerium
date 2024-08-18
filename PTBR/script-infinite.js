const famousQuotes = [
    "a educação é a arma mais poderosa que você pode usar para mudar o mundo",
    "o verdadeiro homem mede a sua força quando se defronta com o obstáculo",
    "nada é permanente exceto a mudança",
    "um pequeno jabuti xereta viu dez cegonhas felizes",
    "três pratos de trigo para três tigres tristes três tigres tristes para três pratos de trigo quem conseguirá resolver a confusão entre o trigo e os tigres sem tropeçar nas palavras e sem confundir o prato que pertence a cada tigre triste",
	"o rato roeu a roupa do rei de roma a rainha com raiva resolveu remendar mas o rato depressa a roupa voltou a roer",
	"sabendo o que sei e sabendo o que sabes e o que não sabes nem eu sei nem tu sabes quem sabe o que saberemos",
	"um ninho de mafagafos com sete mafagafinhos quem desmafagafizar o ninho de mafagafos bom desmafagafizador será"
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
