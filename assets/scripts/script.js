
const cards = document.querySelectorAll('.cards');
const cardImages = ['aviation', 'aviation', 'bloodyMary', 'bloodyMary', 'champagneCocktail', 'champagneCocktail', 'cosmopolitan', 'cosmopolitan',
    'french75', 'french75', 'longIsland', 'longIsland', 'maiTai', 'maiTai', 'margarita', 'margarita', 'martini', 'martini', 'maryPickford',
    'maryPickford', 'mimosa', 'mimosa', 'mojito', 'mojito', 'oldFashioned', 'oldFashioned', 'piscoSour', 'piscoSour', 'tequilaSunrise', 'tequilaSunrise'];

let cardsLength;
let cardsPerRow = '';
let firstCard, secondCard;
let gameContentColSize = '';
let gameLevel = sessionStorage.getItem("gameLevel");
let hasFlippedCard = false;
let HighScoreData;
let lockBoard = false;
let matchedPairs = 0;
let maxPairs = 0;

// Check game difficulty setting and build layout
gameSetup();
buildLayout();

//set game-content and card divs
function buildLayout() {
    document.getElementById("game-board").classList.add(gameContentColSize);

    let game = document.getElementById("game-board");
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

        game.appendChild(card);
    }
    cards.forEach(cards => {
        let randomPos = Math.floor(Math.random() * 12);
        cards.style.order = randomPos;
    });
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
    resetBoard();
};

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 900);
};

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
};

// Seting game difficulty in local storage
$('#easy').click(function () {
    sessionStorage.setItem("gameLevel", "easy");
});
$('#medium').click(function () {
    sessionStorage.setItem("gameLevel", "medium");
});
$('#hard').click(function () {
    sessionStorage.setItem("gameLevel", "hard");
});

// Game set up to start
function gameSetup() {
    switch (gameLevel) {
        case ("easy"):
            maxPairs = 6;
            cardsLength = 12;
            cardsPerRow = 'col-3';
            gameContentColSize = 'game-content-small'
            break;
        case ("medium"):
            maxPairs = 9;
            cardsLength = 18;
            cardsPerRow = 'col-2';
            gameContentColSize = 'game-content-medium'
            break;
        case ("hard"):
            maxPairs = 12;
            cardsLength = 24;
            cardsPerRow = 'col-2';
            gameContentColSize = 'game-content-large'
            break;
    }
};
