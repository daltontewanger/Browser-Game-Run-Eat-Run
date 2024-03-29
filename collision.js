// All collision logic for player growth and scoring
function objectCollision(player, movingObject, scene) {
  const playerWidth = player.displayWidth;
  const playerHeight = player.displayHeight;
  const objectSize = movingObject.displayWidth;

  // Console logs to assist in collision debugging
  console.log("Collision detected!");
  console.log("Player Width:", playerWidth);
  console.log("Player Height:", playerHeight);
  console.log("Object Size:", objectSize);

  if (objectSize < playerWidth) {
    let ratio = objectSize / playerWidth;

    // 3% size increase after each collision with an object that is smaller than the player
    const growthFactor = 0.03;
    const newWidth = playerWidth + playerWidth * growthFactor;
    const newHeight = playerHeight + playerHeight * growthFactor;

    // Set max size for the player
    const maxWidth = 100;
    const maxHeight = 100;

    // Checks if the calculated new size exceeds the maximum size and if not allows the increase
    if (newWidth > maxWidth || newHeight > maxHeight) {
      player.displayWidth = maxWidth;
      player.displayHeight = maxHeight;
    } else {
      player.displayWidth = newWidth;
      player.displayHeight = newHeight;
    }

    // Console logs to assist in collision debugging
    console.log(
      "Player size after growth:",
      player.displayWidth,
      player.displayHeight
    );

    let scoreDelta = Math.round(25 + 125 * ratio);

    movingObject.destroy();

    scene.score += scoreDelta;
    scene.scoreText.setText(`Score: ${scene.score}`);
    scene.sound.play("collisionSound");

    // Make it so if you reach full size you win
    if (player.displayWidth >= maxWidth && player.displayHeight >= maxHeight) {
      scene.handleYouWon();
    }
  } else {
    scene.handleGameOver();
  }
  player.body.setSize(player.displayWidth, player.displayHeight);
}

// Logic for if the player wins
function youWon(scene, highScores) {
  const currentScore = scene.score;
  const isHighScore = highScores.length < 10 || currentScore > highScores[9];

  if (isHighScore) {
    // Add the new high score
    highScores.push(currentScore);

    // Sort high scores
    highScores.sort((a, b) => b - a);

    // Keep only the top 10 scores
    highScores = highScores.slice(0, 10);

    // Update UI
    updateHighScores();
  }

  // Show high scores container
  document.getElementById("highScoresContainer").style.display = "flex";
  // Reset the score
  scene.score = 0;

  // Display a "You Are Now the Strawberry Lord Again!" message
  const winText = scene.add.text(
    scene.game.config.width / 2,
    scene.game.config.height / 2,
    "Congratulations, You Are Now the Strawberry Lord Again!",
    {
      font: "24px Arial",
      fill: "#ffffff",
      backgroundColor: "#000000",
      padding: {
        x: 20,
        y: 20,
      },
      align: "center",
      wordWrap: {
        width: 300,
      },
    }
  );
  winText.setOrigin(0.5);

  // Makes a restart button to start over
  const restartButton = scene.add
    .text(
      scene.game.config.width / 2,
      scene.game.config.height / 2 + winText.height,
      "Restart",
      {
        font: "24px Arial",
        fill: "#ffffff",
        backgroundColor: "#808080",
        padding: {
          x: 10,
          y: 5,
        },
        borderRadius: 5,
      }
    )
    .setInteractive()
    .setOrigin(0.5);

  // Handle restart button click
  restartButton.on("pointerdown", () => {
    scene.scene.restart();
  });

  // Stop the game
  scene.physics.pause();
  scene.time.removeAllEvents();
}

// Logic for if the player loses
function gameOver(scene, highScores) {
  const currentScore = scene.score;
  const isHighScore = highScores.length < 10 || currentScore > highScores[9];

  if (isHighScore) {
    // Add the new high score
    highScores.push(currentScore);

    // Sort high scores
    highScores.sort((a, b) => b - a);

    // Keep only the top 10 scores
    highScores = highScores.slice(0, 10);

    // Update UI
    updateHighScores();
  }

  // Show high scores container
  document.getElementById("highScoresContainer").style.display = "flex";

  // Reset the score
  scene.score = 0;
  // Display a "You Lose" message
  const loseText = scene.add.text(
    scene.game.config.width / 2 - 100,
    scene.game.config.height / 2 - 20,
    "You Lose",
    {
      font: "32px Arial",
      fill: "#ff0000",
    }
  );

  // Makes a restart button to start over
  const restartButton = scene.add
    .text(
      scene.game.config.width / 2 - 60,
      scene.game.config.height / 2 + 20,
      "Restart",
      {
        font: "24px Arial",
        fill: "#ffffff",
        backgroundColor: "#808080",
        padding: {
          x: 5,
          y: 5,
        },
      }
    )
    .setInteractive();

  // Handle restart button click
  restartButton.on("pointerdown", () => {
    scene.scene.restart();
  });

  // Stop the game
  scene.physics.pause();
  scene.time.removeAllEvents();
}
