# MS2 "What's your poison" memory game

"What's your poison" is a version of a traditional memory game involving cards showing a range of cocktail images the user needs to find the matching pair.

![Am I responsive](https://github.com/David-A-Ray/MS2-Whats-your-poison-memory-game/blob/master/docs/Responsive%20Screens.png)

## UX

### User Stories

As a user I would like to:
    * Have the game rules explained to me if needed.
    * Test my memory skills in a fun environment.
    * Have options to increase the difficulty of the game as I progress.
    * Record my time taken on the different levels to challenge myself to improve.

### Strategy

The goal is to build a simple to navigate site with a welcome Modal with game options that then guides the user through the site and back to the start when choosing to exit.

### Scope

For users there needs to be an explanation of how to play available. Additional record of best times to create a competitive environment and aim to improve.

### Structure

To keep navigation as self explanatory as possible the structure of the site should create a natural flow as follows.
    * Home page will use Modals with options to either start a new game with difficulty option, check the rules or check the high scores.
    * The game page will start after selection of difficulty and on completition pass/fail a modal will provide the option to input name if it's a high score pass,
     start again or exit back to home if a fail.
    * The high scores page will only have navigation to return to home page.

### Skeleton

Wire frames for page layouts and modals as follows:
* [Home Screen](https://github.com/David-A-Ray/MS2-Whats-your-poison-memory-game/blob/master/docs/Home%20Screen.pdf)
* [Game Screen](https://github.com/David-A-Ray/MS2-Whats-your-poison-memory-game/blob/master/assets/docs/Game%20screen.pdf)
* [High score screen](https://github.com/David-A-Ray/MS2-Whats-your-poison-memory-game/blob/master/assets/docs/High%20Score%20page.pdf)

### Surface

The look and feel of the site is to feel like your in a vintage bar environment, dark classical colours with fun easy to identify cocktail images.

## Technologies

### Languages
* [HTML5](https://en.wikipedia.org/wiki/HTML5) - provides content and structure of the site.
* [CSS3](https://en.wikipedia.org/wiki/CSS) - adds styling.
* [JAVASCRIPT](https://en.wikipedia.org/wiki/JavaScript) - all logic for card game.

### Frameworks 
* [Bootstrap V4.5.2](https://getbootstrap.com/docs/4.5/getting-started/introduction/) - provides the bulk of responsive layout.
* [jquery](https://jquery.com/) - used on dropdown menu.
* [GitHub](https://github.com/) - GitHub has been used to manage version control and push content to repo.
* [GitPod](https://www.gitpod.io/) - used as the IDE for building the site.
* [Google FONTS](https://fonts.google.com/) - imported for 2 font varieties.
* [Balsamiq wireframes](https://balsamiq.com/wireframes/?gclid=CjwKCAiA17P9BRB2EiwAMvwNyJFLuwdZxoUMDd-KJV_EtTEdllWFxfMzYAxyyiN7yGBDdFV0IoCHQRoCe0EQAvD_BwE) - used for all wireframes.
* [TinyPNG](https://tinypng.com/) - used to compress initial image files.
* [CSS Autoprefixer](https://autoprefixer.github.io/) - CSS was checked for browser compatibility. 
* [AmIResponsive](http://ami.responsivedesign.is/) - used for initial responsive display and testing.

## Features
* Home Page:
    * Start button - to trigger first modal interaction with options:
        * How to play - triggers second modal with rules and exit to return to first modal.
        * New Game - triggers newGameModal with 3 further difficulty options and Exit back to first modal option.
            * Easy -loads game screen with easy setting 12 cards.
            * Medium - loads game screen with medium setting and 18 cards.
            * Hard - loads game screen with hard setting and 24 cards.
        * High Scores - loads game screen and checks session storage to merge with standard highscores.

* Game Screen:
    * Exit button in top right to return to index.html
    * Score bar
        * Display clicks allowed to be used for calculating score.
        * Display countdown timer.
    * Game area - used for all cards to be stored in variable layouts and sizes.
        * Random selection of cards from array.
        * Random order of cards to be shown.
        * Animation of card flips when clicked.
    * Game Modals:
        * New high score if final score qualifies as a new record.
            * Option for user to enter name, save and view scoreboard.
            * Option to play again and reload difficulty.
            * Option to exit back to main menu.
        * Game won but no highscore modal.
            * Congratulations message.
            * Option to play again.
            * Option to exit.
        * Game over Modal when time expires.
            * Failure message.
            * Option to try again.
            * Exit option.
    * High Scores display
        * Should merge session storage records with initial scores, sort and display.

## Features left to implement
* Audio: Had originally considered it but whilst trying found it to be annoying and unecessary. Also slowed game play down.
    * Potentially add background music.
    * Potentially add Game won record, game complete and game lost audio.

## Testing

### Pre-Deployment
Throughout development the site was previewed locally and tested as elements were added. The layout waschecked for responsiveness using developer tools. 
Console.log was used throughout building code for JS functions. All now removed.

### Post-Deployment
* Deployed site was shared with friends and family. Some issues came back with cards not displaying drinks on Safari.
    * Ran the CSS through Autoprefixer to fix issues.
* Main Menu Modal was not displayed in the center.
    * CSS was adjusted

### Final checks on code
* Code validation
    * W3 HTML validator.
    * W3 CSS validator.
    * Code beautifyer was used for JS.

### Feature testing
* index.html
    * Header central and responsive.
    * Lets begin button central and triggers first modal.

    ![Home Screen](https://github.com/David-A-Ray/MS2-Whats-your-poison-memory-game/blob/master/docs/testing%20Images/homeScreen.png "Home Screen")

    * firstModal - display and option

    ![First Modal](https://github.com/David-A-Ray/MS2-Whats-your-poison-memory-game/blob/master/docs/testing%20Images/firstModal.png "first modal")

    * RulesModal - display and exit button

    ![Rules Modal](https://github.com/David-A-Ray/MS2-Whats-your-poison-memory-game/blob/master/docs/testing%20Images/RulesModal.png "rules modal")

    * NewGameModal - display and button options

    ![New Game Modal](https://github.com/David-A-Ray/MS2-Whats-your-poison-memory-game/blob/master/docs/testing%20Images/DifficultyModal.png "new game modal")

* theBar.html
    * High Scores display - creates table in thebar.html

    ![High scores display](https://github.com/David-A-Ray/MS2-Whats-your-poison-memory-game/blob/master/docs/testing%20Images/Highscores.png "high scores display")

    * Easy Game Screen - all tested but only showing 1 set.
        * clicks allowed, timer and exit button all displayed correctly.
        * Card layouts all correct.

    ![Easy game display](https://github.com/David-A-Ray/MS2-Whats-your-poison-memory-game/blob/master/docs/testing%20Images/gameEasy.png "easy game display")

    * Card flips and match functions working. Timer reducing after first click and clicks allowed altering with airs clicked.

    ![game function display](https://github.com/David-A-Ray/MS2-Whats-your-poison-memory-game/blob/master/docs/testing%20Images/gameFunction.png "game function display")

    * Game lost modal pop up when timer reaches 0.

    ![game lost modal](https://github.com/David-A-Ray/MS2-Whats-your-poison-memory-game/blob/master/docs/testing%20Images/GameLostModal.png "game lost modal")

    * Game won no record modal when final score isn't high enough to get on score board.

    ![game won modal](https://github.com/David-A-Ray/MS2-Whats-your-poison-memory-game/blob/master/docs/testing%20Images/gameWonModal.png "game won modal")

    * New high record modal display with name entry field

    ![game record modal](https://github.com/David-A-Ray/MS2-Whats-your-poison-memory-game/blob/master/docs/testing%20Images/gameWonRecord.png "game record modal")

    * Updated highscore display with "test" added as username

    ![updated high score display](https://github.com/David-A-Ray/MS2-Whats-your-poison-memory-game/blob/master/docs/testing%20Images/updatedHighScore.png "updated high score")

### User stories Testing


## Deployment


## Credits


### media
    * Images and rights to use taken from Shutterstock.com

### Acknowledgments