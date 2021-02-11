
let cards = document.querySelectorAll("cards");
let cardImages = [];
const cardRange = ['aviation', 'bloodyMary', 'champagneCocktail', 'cosmopolitan', 'french75', 'longIsland', 'maiTai', 'margarita', 'martini', 'maryPicford', 'mimosa', 'mojito', 'oldFashioned', 'piscoSour', 'tequilaSunrise']

let cardsLength = 0; // This is used to ...
let cardsPerRow = '';
let clicksAllowed = 0;
let colStyle = '';
let extraTime = 0;
let firstCard, secondCard;
let firstClick = 0;
let flippedCardCount = 0;
let flipsAllowed = 0;
let gameLevel = sessionStorage.getItem("gameLevel");
let hasFlippedCard = false;
let HighScoreData;
let lockBoard = false;
let matchedPairs = 0;
let maxPairs = 0;
let selected = [];
let shuffled = [];
let startTime = "";

/* 
Run functions in order 
*/
$('document').ready(function () {
    // grab the query parameter from the url and pass it to game setup
    let difficulty = new URLSearchParams(window.location.search).get('difficulty');
    gameSetup(difficulty);
    buildLayout();
});


/*
set game-content and card divs..............
*/

function gameSetup(difficulty) {
    switch (difficulty) {
        case ("easy"):
            maxPairs = 6;
            cardsLength = 12;
            cardsPerRow = 'col-3';
            colStyle = 'game-content-small';
            clicksAllowed = 24;
            extraTime = 0;
            startTime = '0m : 30s';
            break;
        case ("medium"):
            maxPairs = 9;
            cardsLength = 18;
            cardsPerRow = 'col-2';
            colStyle = 'game-content-medium';
            clicksAllowed = 36;
            extraTime = 15000;
            startTime = '0m : 45s';
            break;
        case ("hard"):
            maxPairs = 12;
            cardsLength = 24;
            cardsPerRow = 'col-2';
            colStyle = 'game-content-large';
            clicksAllowed = 48;
            extraTime = 30000;
            startTime = '1m : 0s';
            break;
    }
};

function buildLayout() {
    let game = document.getElementById("game-board");
    game.classList.add(colStyle);

    $("#timer").html(startTime);
    let flipsAllowed = cardsLength * 2;
    $("#flipsAllowed").html(flipsAllowed);

    // https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
    let shuffled = cardRange.sort(function () { return .5 - Math.random() });
    let selected = shuffled.slice(0, maxPairs);
    let cardImages = selected.concat(selected); cardImages.sort(function () { return .5 - Math.random() });

    for (let i = 0; i < cardsLength; i++) {
        let card = document.createElement('div');
        card.className = (`${cardsPerRow} cards`);
        card.setAttribute('data-id', cardImages[i]);
        card.addEventListener('click', flipCard);

        let frontOfCard = document.createElement('div');
        frontOfCard.className = `frontFace ${cardImages[i]}`;

        let backOfCard = document.createElement('div');
        backOfCard.className = "backFace";

        card.append(frontOfCard, backOfCard);

        /*
        The html looks like this:
        <div class="col-3 cards" data-id="bloodyMary">
            <div class="frontFace bloodyMary">
            </div>
            <div class="backFace">
            </div>
        </div>
        */

        game.appendChild(card);
    }
};


/*
Game play functions.................................
*/

function flipCard() {
    firstClick += 1;
    let remainingflips = (flipsAllowed - 1);
    $("#flipsAllowed").html(remainingflips);
    if (firstClick == 1) timer(30);

    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;

    flippedCardCount += 2;

    checkForMatch();
};

function checkForMatch() {
    let isMatch = firstCard.dataset.id === secondCard.dataset.id;
    isMatch ? pairMatched() : pairDontMatch();
};

function pairMatched() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchedPairs += 1;

    checkGameWon();
};

function checkGameWon() {
    let gameWon = matchedPairs === maxPairs;
    gameWon ? (clearInterval(gameTime), gameComplete()) : resetBoardStatus();
};

function pairDontMatch() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoardStatus();
    }, 800);
};

function resetBoardStatus() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
};

function gameComplete() {
    $('#GameWonModal').modal('toggle');
}

function gameOver() {
    $('#GameLostModal').modal('toggle');
}

/*
Display count functions for time, clicks and work out final score.......
*/
// Game timer
function timer(time) {
    time = new Date().getTime() + (time * 1000);
    gameTime = setInterval(function () {
        let now = new Date().getTime();
        timeDiff = time - now + extraTime;
        let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        timeRemaining = (minutes * 60) + seconds;
        $("#timer").html(minutes + "m : " + seconds + "s ");
        if (timeDiff < 1000) {
            clearInterval(gameTime);
            $("#timer").html("Time's Up!");
            gameOver();
        }
    }, 1000);
}

// Sound Effect

//var backGroundSound;
//var correctSound;
//var errorSound;
//var winSound;
//var lossSound;