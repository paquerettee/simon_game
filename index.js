let tiles = ["green", "red", "yellow", "blue"]; // available colors
let level = 0;
let chosenTiles = [];
let clickIdx = 0;
let gameplay = false;

// play button audio
function playAudio(color) {
  let audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

// animate button pressing
function animateButton(color) {
  $(".game ." + color)
    .fadeOut(200)
    .fadeIn(200);
}

// chose random button and show it
function showNextTile() {
  let tileIdx = Math.floor(Math.random() * 4);
  chosenTiles.push(tileIdx);
  playAudio(tiles[tileIdx]);
  animateButton(tiles[tileIdx]);
}

// check if proper button and in proper order was clicked
function checkClickedTile(color) {
  if (clickedColor == tiles[chosenTiles[clickIdx]]) {
    playAudio(clickedColor);
    animateButton(clickedColor);
    clickIdx++;
    if (clickIdx == chosenTiles.length) {
      setTimeout(function () {
        playGame();
      }, 600);
    }
  } else {
    $("h1").text("Game over!"); // game over
    playAudio("wrong");
    $("h2").show();
    $("h2").text("Press any key to restart!");
    gameplay = false;
  }
}

// play one level of a game
function playGame() {
  level += 1;
  clickIdx = 0;
  $("h1").text("Level " + level);
  showNextTile();
  // console.log(chosenTiles);
}

// clear variables
function restartGame() {
  console.log("restart game");
  gameplay = true;
  level = 0;
  chosenTiles = [];
  clickIdx = 0;
  $("h2").hide();
}

// start the game - check for pressing any key
$(document).on("keydown", function () {
  if (gameplay == false) {
    restartGame();
    playGame();
  }
});

// check for pressing any button
$(".game div").on("click", function () {
  if (gameplay) {
    clickedColor = $(this).attr("class");
    checkClickedTile(clickedColor);
  }
});
