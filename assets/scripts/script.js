
const cardImages = ['aviation', 'bloodyMary', 'champagneCocktail', 'cosmopolitan', 'french75', 'longIsland', 'maiTai', 
'margarita', 'martini', 'maryPickford', 'mimosa', 'mojito', 'oldFashioned', 'piscoSour', 'tequilaSunrise'];
let cardsLength = 0;
let cardsPerRow;
let gameLevel = sessionStorage.getItem("gameLevel");
let matchedPairs = 0;
let maxPairs = 0;

// Check local and session storage
checkDataStorage();

// Check game difficulty setting
gameSetup();

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
            break;
        case ("medium"):
            maxPairs = 10;
            cardsLength = 20;
            cardsPerRow = 'col-3';
            break;
        case ("hard"):
            maxPairs = 15;
            cardsLength = 30;
            cardsPerRow = 'col-2';
            break;
    }
};