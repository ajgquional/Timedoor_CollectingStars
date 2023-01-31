# Collecting Stars

![Collecting Stars Sample Output](https://github.com/ajgquional/Timedoor_CollectingStars/blob/ccd4abee9ce0e3bb5b53de6c33a75896c6d2ae9c/CollectingStarsSampleOutput.png)

## Description of the game
This is the first Phaser game of Intermediate 2 of the Intermediate JavaScript class of Timedoor Coding Academy. In this game, players have to control a "dude" character using arrow keys in the keyboard (left arrow key to move left, right arrow key to move right, and up arrow key to moveup/jump) to collect stars in the game. There are platforms within the game where stars would be placed. After collecting a star, a bomb would be dropped from the sky and once the bomb hits the player, it would be game over. The goal of the game is to collect as many stars (and earn as many points - 1 star is equal to 10 points) as possible while evading the bombs. After all stars are collected, another set of stars would come from the sky and the player has the chance to collect them again.

The codes for this game  are mostly copied from Timedoor's Intermediate JavaScript course book, but modified due to personal preference and due to existence of errors in the original source code. The codes here (especially the scene code) are highly annotated and documented for clarity.

## About the repository
This repository only contains the source codes as well as assets linked in the book (as a Google Drive link). Thus, this repository is mainly for reference. Should you wish to use these files, you may download them and copy them to the template folder but make sure first that a Phaser framework is installed in your local machine and necessary steps have been conducted (such as installation of node.js and Visual Studio Code). Afterwards, the public (which contains the assets) and src (which contains all the source codes) folders can be copied in the game folder. The "game" can be run by typing the command ```npm run start``` in the terminal within Visual Studio Code, then clicking on the local server link (for instance, localhost:8000) in the terminal. The game will then open in your default browser.

## Summarized game mechanics and link to sample game
Game Mechanics
- Controls: Left Arrow to move left, Right Arrow to move right, and Up Arrow to jump
- Rules:
  - Collect as many stars as possible and earn as many points as you can (1 star = 10 points).
  - Once all stars are collected, new stars would be created.
  - Bombs would fall from the sky once a star is collected (1 star = 1 bomb).
  - Once a bomb is touched, the game is over.
  
Link to the sample game: https://td-collectingstars-adrian.netlify.app/
  
