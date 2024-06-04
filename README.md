# Browser Game Project
-- Inspiration for this game comes from one of my favorite/old flash games from Neopets called "Jelly Blobs of Doom"
-- The game can be played here https://dtrain102.itch.io/run-eat-run

## Goal is to use the gaming library Phaser.io to help with the handling of the physics within the project

## There will be a playable character that can move around with arrow keys within a playable area
  - The character will start at a simple size of 16 by 16 px for example and in the center of the screen/playable area

## There will be objects that can come from any side of the screen/playable area and move directly to the other side in a straight line
  - these objects will vary in speed to add difficulty (if possible)
  - these objects will vary in size between 50% smaller and up to the maximum size possible for the game

## There will be collision handling with the objects and the character
  - If the object is smaller than the character it will be "eaten" and the character will grow a small percentage to be able to eat larger objects and earn you points
  - If the object is larger than the character it will "eat" you and the game will end

## The game will track and display a score along with a highscore 
  - If you lose you can play again and the screen will display a highscore off on the side of your best play through
  - The highscore will reset upon reload or opening a new browser since it will all be stored locally
