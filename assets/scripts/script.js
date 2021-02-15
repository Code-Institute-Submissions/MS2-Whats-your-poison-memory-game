
let bonusPoints = 0; //clicks remaining *2 for score
let cardImages = []; //used to add randomly selected new array of cardRange depending on game size
const cardRange = ['aviation', 'bloodyMary', 'champagneCocktail', 'cosmopolitan', 'french75',
    'longIsland', 'maiTai', 'margarita', 'martini', 'maryPicford', 'mimosa', 'mojito', 'oldFashioned', 'piscoSour', 'tequilaSunrise'];
let highScores = [
    [100, 'Winston Churchill', 'Hard'],
    [90, 'Ernest Hemingway', 'Hard'],
    [80, 'Frank Sinatra', 'Hard'],
    [70, 'Oliver Stone', 'Hard'],
    [60, 'Benjamin Franklin', 'Medium'],
    [50, 'The Queen Mother', 'Medium'],
    [40, 'Ava Gardner', 'Medium'],
    [30, 'Vincent Van Gogh', 'Easy'],
    [20, 'Boris Johnson', 'Easy'],
    [10, 'Donald Trump', 'Easy']
]; //starter highscore targets

let cardsLength = 0; //used to set flipsAllowed target and also create all the div's in buidGame()
let cardsPerRow = ''; //sets 'col-3' or 'col-2' depending on game difficulty
let clicksRemaining = 0; //flipsAllowed -= 2 in first click function displayed on screen
let colStyle = ''; //adjusts #display-board class for CSS alterations
let extraTime = 0; //time increase set in level difficulty and used in timer()
let finalScore = 0; //timeRemaining*2 + bonusPoints
let firstCard, secondCard; //Used in comparator to check for cards match
let firstClick = 0; //used to add value to set first click and prevent card being flipped multiple times
let flipsAllowed = 0; //sets target for optimal clicks to complete game
let hasFlippedCard = false; //used to see if card has already been clicked
let lockBoard = false; //boolean used to prevent more than 2 cards being flipped at the same time
let matchedPairs = 0; //records a match to evaluate if game has been won
let mode = ''; //used for game level settings
let maxPairs = 0; //sets matches required to win in game mode
let newHighScore; //boolean used if users final score >= any position in initialHighScores array
let savedHighScores = sessionStorage.getItem('highScoreList') || '[]'; //checks local storage for exsisting player high scores
let startTime = ""; //set in game level and displayed above cards before timer() is called
const tableHeaders = ['Score', 'Name', 'Difficulty']; //used for highscore table display
let time = 0; //time is set by game level on load

/* 
Run functions in order 
assistance with code from mentor
*/
$('document').ready(function () {
    // grab the query parameter from the url and pass it to game setup
    mode = new URLSearchParams(window.location.search).get('mode');
    gameSetup(mode);
    if (mode === "highScores") { // check if highscores has been selected first
        displayHighScores(highScores);
    } else {  //if not highscores then call buildLayout
        buildLayout();
    }
});

/*
set game-content and starting values based on mode selected
*/
function gameSetup(mode) {
    switch (mode) {
        case "Easy":
            maxPairs = 6;
            cardsLength = 12;
            cardsPerRow = 'col-3';
            colStyle = 'game-content-small';
            time = 30000;
            startTime = '0m : 30s';
            break;
        case "Medium":
            maxPairs = 9;
            cardsLength = 18;
            cardsPerRow = 'col-2';
            colStyle = 'game-content-medium';
            time = 50000;
            startTime = '0m : 50s';
            break;
        case "Hard":
            maxPairs = 12;
            cardsLength = 24;
            cardsPerRow = 'col-2';
            colStyle = 'game-content-large';
            time = 75000;
            startTime = '1m : 15s';
            break;
        case "highScores":
            break;
    }
}

/*
Once level has been selected add class to game container, randomise card selection and create all the card div's
*/
function buildLayout() {
    let game = document.getElementById("display-board");
    game.classList.add(colStyle); //adds class to alter css based on easy/medium/hard

    $("#timer").html(startTime); //sets start time display before timer() function is called
    flipsAllowed = cardsLength * 2;
    $("#flipsAllowed").html(flipsAllowed); //sets and displays flips allowed based on card length

    // https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
    let shuffled = cardRange.sort(function () { return 0.5 - Math.random(); });
    let selected = shuffled.slice(0, maxPairs);
    cardImages = selected.concat(selected); cardImages.sort(function () { return 0.5 - Math.random(); });

    for (let i = 0; i < cardsLength; i++) { //loop to repeat until correct number of cards generated
        let card = document.createElement('div'); //creates a div
        card.className = (`${cardsPerRow} cards`); //adds to class names to card div
        card.setAttribute('data-id', cardImages[i]); //sets data-id to match cardImage[loop] used to check for matching cards
        card.addEventListener('click', flipCard); //adds event listener to each card

        let frontOfCard = document.createElement('div');
        frontOfCard.className = `frontFace ${cardImages[i]}`; //creates a front of card div with css class and image class

        let backOfCard = document.createElement('div');
        backOfCard.className = "backFace"; //creates a back of card div with css class

        card.append(frontOfCard, backOfCard); //appends front and back div's to card div

        /*
        The html looks like this:
        <div class="col-3 cards" data-id="bloodyMary">
            <div class="frontFace bloodyMary">
            </div>
            <div class="backFace">
            </div>
        </div>
        */

        game.appendChild(card); //appends card to game container DIV and repeats loop
    }
}


/*
Game play functions.................................
*/

/*
onclick function for cards, toggles flip class for css effects
initial code taken form https://marina-ferreira.github.io/tutorials/js/memory-game/ and adapted
*/
function flipCard() {
    firstClick += 1;
    if (firstClick == 1) timer(time); //starts timer on firstClick

    if (lockBoard) return; //checks if lockboard is true and returns out of function
    if (this === firstCard) return; //checks the same card isn't clicked twice

    this.classList.toggle('flip'); //if valid, flips card using css class

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this; //stores this as first card
        return;
    }
    secondCard = this; //stores this as second card

    clicksRemaining = flipsAllowed -= 2; //after 2 valid card turns adjusts the clicksRemaining counter and display
    $("#flipsAllowed").html(clicksRemaining);

    checkForMatch(); //calls function to see if cards match
}

/*
ternary operator checking if firstCard & secondCard 'data-id' are a match
initial code taken form https://marina-ferreira.github.io/tutorials/js/memory-game/ and adapted
*/
function checkForMatch() {
    let isMatch = firstCard.dataset.id === secondCard.dataset.id;  //checks if dataset.id are a macth
    isMatch ? pairMatched() : pairDontMatch(); //if true calls pairMatched() : if false calls pairsDontMatch
}

/*
cards match function, removes event listener, increases matchedPairs count
and calls checkGameWon function
initial code taken form https://marina-ferreira.github.io/tutorials/js/memory-game/ and adapted
*/
function pairMatched() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchedPairs += 1;

    checkGameWon();
}

/*
sees if matchedPairs counter === maxPairs value ternary operator
*/
function checkGameWon() {
    let gameWon = matchedPairs === maxPairs;
    gameWon ? (clearInterval(gameTime), gameComplete()) : resetBoardStatus(); //true - clears timer and calls gameComplete, false calls resetBoardStatus
}

/*
firstCard secondCard don't match
initial code taken form https://marina-ferreira.github.io/tutorials/js/memory-game/ and adapted
*/
function pairDontMatch() {
    lockBoard = true; //prevents further clicks till function complete
    setTimeout(() => { //timeout used to keep cards visible for short period
        firstCard.classList.remove('flip'); //removes flip css so cards flip back
        secondCard.classList.remove('flip'); //removes flip css so cards flip back
        resetBoardStatus(); //calls resetBoardStatus
    }, 800); //timeout of just under 1s
}

/*
resetBoardStatus clears values used in flipcard & checkformatch functions
initial code taken form https://marina-ferreira.github.io/tutorials/js/memory-game/ and adapted
*/
function resetBoardStatus() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

/*
after a pair match check if game is complete
*/
function gameComplete() {
    bonusPoints = (clicksRemaining * 2); //set bonusPoints value
    finalScore = (timeRemaining * 2 + bonusPoints); //set final score value

    for (let i = 0; i < 10; i++) { //checks if final score is higher than current highscores
        if (finalScore >= highScores[i][0]) {
            newHighScore = true; //boolean usead to trigger modal if score qualifys
            break; //break out of function if criteria met
        }
    }
    if (newHighScore === true) { //if newHighScore is true fires the following modal with display
        $('#highScoreModal').modal('toggle');
        $("#recordTime").html(timeRemaining);
        $("#recordPoints").html(bonusPoints);
        $("#recordScore").html(finalScore);
    } else { //if newHighScore is false displays game complete modal with display
        $('#gameWonModal').modal('toggle');
        $("#finishTime").html(timeRemaining);
        $("#bonusPoints").html(bonusPoints);
        $("#finalScore").html(finalScore);
    }
}

/*
record player details as array, check session storage and add details to records, update session storage
*/
function saveHighScore() {
    let name = $('#playerName'); //sets name from text input
    name = name.val(); //takes value of text
    let highScoreDetails = new Array(finalScore, name, mode); //creates array

    let playerHighScores = [...JSON.parse(savedHighScores), highScoreDetails]; //checks for session storage and adds new array
    playerHighScores.sort(function (a, b) { return b[0] - a[0]; }); //sorts player records

    sessionStorage.setItem('highScoreList', JSON.stringify(playerHighScores)); //stores back in session storage
}

/*
Display functions for time and highscores.......
influenced by stackoverflow: https://stackoverflow.com/questions/23025867/game-timer-javascript
*/
// Game timer
function timer() { //time value taken from game setting difficulty
    time = new Date().getTime() + (time); //sets time countdown
    gameTime = setInterval(function () { //uses interval to refresh display
        let now = new Date().getTime(); //sets current time
        timeDiff = time - now; //calcs time difference in correct format
        let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); //works out minutes
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000); //works out seconds
        timeRemaining = (minutes * 60) + seconds;
        $("#timer").html(minutes + "m : " + seconds + "s "); //updates timer display html
        if (timeDiff < 1000) { //when timer finishes calls outOfTime()
            clearInterval(gameTime);
            $("#timer").html("Time's Up!");
            outOfTime();
        }
    }, 1000); //refresh every second
}

/*
out of time triggers gameLostModal
*/
function outOfTime() {
    $('#gameLostModal').modal('toggle');
}

/*
Displays high score table inplace of game when called
*/
function displayHighScores() {
    let highScoreDisplay = document.getElementById("display-board");
    highScoreDisplay.classList.add("score-board"); //sets class on display-board div

    let header = document.createElement("h1");
    let headerContent = document.createTextNode("The greatest drinkers of all time!");
    header.appendChild(headerContent);
    highScoreDisplay.appendChild(header); //creates and adds H1 header to display-board

    let table = document.createElement("table");
    table.classList.add("high-scores-table"); //creates and adds high-scores-table to display-board

    let headerTitles = document.createElement("tr"); //adds row to table
    table.appendChild(headerTitles);
    for (let h = 0; h < tableHeaders.length; h++) {
        let titles = `<th>${tableHeaders[h]}</th>`;
        headerTitles.insertAdjacentHTML('beforeend', titles);
    } //inserts headerTitles in bold to row

    let fullList = JSON.parse(savedHighScores).concat(highScores); //checks session storage and concats with highscores
    fullList.sort(function (a, b) { return b[0] - a[0]; }); //sorts array into decending order

    for (let i = 0; i < 10; i++) {
        let row = document.createElement("tr");
        table.appendChild(row); //adds row to table
        for (let j = 0; j < 3; j++) {
            let result = `<td>${fullList[i][j]}</td>`;
            row.insertAdjacentHTML('beforeend', result);
        } //inserts HighScore records to row
    }
    highScoreDisplay.appendChild(table);
}