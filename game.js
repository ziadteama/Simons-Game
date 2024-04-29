//variables declaration
var userClickedPattern = [];
var gamePattern = [];
const doc = $(document);
const buttons = $(".btn");
const buttonColours = ["red", "blue", "green", "yellow"];
var randomNumber;
var randomChosenColor;
var sequenceButton = $("#" + randomChosenColor);
var level = 0;
var isGameOn = false;

// Functions Declaration
function nextSequence() {
  userClickedPattern = [];
  randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);
  randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  flash($("#" + randomChosenColor));
  playAudio(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
}

function flash(element) {
  element.fadeIn(100).fadeOut(100).fadeIn(100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else{
    playAudio("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  isGameOn = false;
}
function playAudio(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour) {
  let target = $("#" + currentColour);
  target.addClass("pressed");

  setInterval(function () {
    target.removeClass("pressed");
  }, 100);
}

//body code

doc.on("keydown", function () {
  if (!isGameOn) {
    nextSequence();
    level--;
    $("h1").text("Level 0");
    isGameOn = true;
  }
});
buttons.on("click", function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playAudio(userChosenColor);
  flash($("#" + userChosenColor));
  checkAnswer(userClickedPattern.length - 1);
});
