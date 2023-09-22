let gamePaused = false;
let playerScore = 0;
let computerScore = 0;

const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('resume');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const choices = document.querySelectorAll('.choice');
const message = document.getElementById('message');

pauseButton.addEventListener('click', () => {
    gamePaused = true;
    disableButtons();
    message.textContent = 'Game Paused';
});

resumeButton.addEventListener('click', () => {
    gamePaused = false;
    enableButtons();
    message.textContent = 'Choose an option to continue.';
});

function disableButtons() {
    choices.forEach(choice => choice.disabled = true);
    pauseButton.disabled = true;
    resumeButton.disabled = false;
}

function enableButtons() {
    choices.forEach(choice => choice.disabled = false);
    pauseButton.disabled = false;
    resumeButton.disabled = true;
}

function playGame(e) {
    if (gamePaused) return;

    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const result = getGameResult(playerChoice, computerChoice);

    message.textContent = `You chose ${playerChoice}. Computer chose ${computerChoice}. ${result}`;

    if (result === 'You win!') {
        playerScore++;
    } else if (result === 'Computer wins!') {
        computerScore++;
    }

    playerScoreDisplay.textContent = `Player: ${playerScore}`;
    computerScoreDisplay.textContent = `Computer: ${computerScore}`;
}

function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getGameResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    } else if (
        (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
        (playerChoice === 'Paper' && computerChoice === 'Rock') ||
        (playerChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
        return 'You win!';
    } else {
        return 'Computer wins!';
    }
}

resetScore();

choices.forEach(choice => {
    choice.addEventListener('click', playGame);
});

function resetScore() {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = `Player: ${playerScore}`;
    computerScoreDisplay.textContent = `Computer: ${computerScore}`;
}