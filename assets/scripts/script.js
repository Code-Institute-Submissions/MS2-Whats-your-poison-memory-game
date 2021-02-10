
let cards = document.querySelectorAll("cards");
let cardImages = [];
const cardRange = ['aviation', 'bloodyMary', 'champagneCocktail', 'cosmopolitan', 'french75', 'longIsland', 'maiTai', 'margarita', 'martini', 'maryPicford', 'mimosa', 'mojito', 'oldFashioned', 'piscoSour', 'tequilaSunrise']

let cardsLength; // This is used to ...
let cardsPerRow = '';
let colStyle = '';
let firstCard, secondCard;
let gameLevel = sessionStorage.getItem("gameLevel");
let hasFlippedCard = false;
let HighScoreData;
let lockBoard = false;
let matchedPairs = 0;
let maxPairs = 0;
let selected = [];
let shuffled = [];

/*
GAME IS OVER
------------
Display modal with score
Save score in localStorage
Provide option to restart or change difficulty
*/

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
This is function doc. This describes what the function is supposed to accomplish.
*/
function dummyFunctionForCommentExplanation() {
    // This is an inline comment
    2 + 2
    // Another comment describing the code
}


//set game-content and card divs
function buildLayout() {
    let game = document.getElementById("game-board");
    game.classList.add(colStyle);

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

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;

    checkForMatch();
};

function checkForMatch() {
    let isMatch = firstCard.dataset.id === secondCard.dataset.id;
    isMatch ? disableCards() : unflipCards();
};

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoardStatus();
};

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoardStatus();
    }, 900);
};

function resetBoardStatus() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
};

//// Seting game difficulty in local storage
//$('#easy').click(function () {
//    sessionStorage.setItem("gameLevel", "easy");
//});
//$('#medium').click(function () {
//    sessionStorage.setItem("gameLevel", "medium");
//});
//$('#hard').click(function () {
//    sessionStorage.setItem("gameLevel", "hard");
//});

function saveScore(score) {
    //    sessionStorage.setItem("gameLevel", "hard");
}

// Game set up to start
function gameSetup(difficulty) {
    switch (difficulty) {
        case ("easy"):
            maxPairs = 6;
            cardsLength = 12;
            cardsPerRow = 'col-3';
            colStyle = 'game-content-small';
            break;
        case ("medium"):
            maxPairs = 9;
            cardsLength = 18;
            cardsPerRow = 'col-2';
            colStyle = 'game-content-medium';
            break;
        case ("hard"):
            maxPairs = 12;
            cardsLength = 24;
            cardsPerRow = 'col-2';
            colStyle = 'game-content-large';
            break;
    }
};