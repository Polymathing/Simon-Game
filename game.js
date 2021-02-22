//1. Creating the array of colours
var buttonColours = ["red", "blue", "green", "yellow"];

//2. Pattern list
var gamePattern = [];
var userClickedPattern = [];

//3. Checking whether the game has started
var started = false
var level = 0
$(document).on("keydown", function() {
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

//4. Dectecting which button has been clicked
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1)
   
});

//5. Creating the next sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text(`Level ${level}`);

    //Generating a random number from 0 to 3
    var randomNumber = Math.floor(Math.random() * 4);
    // Selecting random colour 
    var randomChosenColour = buttonColours[randomNumber];
    //Getting the random colour and adding to our Game Pattern
    gamePattern.push(randomChosenColour);

    //Showing the sequence to the user with animations and sounds
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

//6. Playing the colour's sound
function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
    }

//7. Animating the button with shadow
function animatePress(currentColor) {

    $(`#${currentColor}`).addClass("pressed")
    setTimeout(function(){
        $(`#${currentColor}`).removeClass('pressed');
      },100);
   
}

//8. Checking answer 
function checkAnswer(currentLevel) {
     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log(`success!`);

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout (function () {
                nextSequence();
            }, 1000);
        }
     } else {
         $("#level-title").html("Game Over!<p> Press ENTER to Restart </p>")
         $("body").addClass("game-over")
         setTimeout (function() {
            $("body").removeClass("game-over")
         }, 200)
         audio = new Audio(`sounds/wrong.mp3`)
         audio.play()

        $(document).on("keydown", startOver())
     } 
}

//9. Starting over
function startOver() {
    level = [];
    gamePattern = [];
    started = false;
}