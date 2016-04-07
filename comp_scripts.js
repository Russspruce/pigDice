function Score() {
  this.tempScore = 0;
  this.totalScore = 0;

}

function Replay() { //Gives message for replay that will refresh page
  var response = confirm("Would you like to play again?");
   if(response)location.reload();
}

function myTimeout(){
  console.log("timed out");
}

Score.prototype.computerPig = function(currentPlyr) {
  for(var index = 0; index < 2; index++){

    var randRoll = 1 + Math.floor(Math.random() * 6);
      $("#currentDiceRoll").text(randRoll);
         if (randRoll === 1) {
           this.tempScore = 0;
           $("#currentSubTotal").text(this.tempScore);

           break;
         } else {
           this.addTemp(randRoll);
           $("#currentSubTotal").text(this.tempScore);
           if (this.totalScore + this.tempScore >= 50) {
             alert("Oh darn!  Looks like the machines will now take over the world.  Thanks a lot, Player!")
             Replay();
           }
      }
  }
  $("#currentPlayerOne").toggle();
  $("#currentPlayerTwo").toggle();
  $("#playerButtons").toggle();
  $("#computerButton").toggle();
  this.totalScore += this.tempScore;
  $("#playerTwoScore").text(this.totalScore);

  this.tempScore = 0;
  currentPlyr = (currentPlyr * -1);
  return currentPlyr;

}

Score.prototype.addTotal = function(tempScore) {
  this.totalScore += tempScore;

}

Score.prototype.playerTurn = function(currentPlyr) { //goes through roll and calculates points
  var randRoll = 1 + Math.floor(Math.random() * 6);
  $("#currentDiceRoll").text(randRoll);
  if (randRoll === 1) {
    this.tempScore = 0;
    currentPlyr = (currentPlyr * -1);
    $("#currentSubTotal").text(this.tempScore);
    $("#currentPlayerOne").toggle();
    $("#currentPlayerTwo").toggle();
    $("#playerButtons").toggle();
    $("#computerButton").toggle();

  } else {
    this.addTemp(randRoll);
    $("#currentSubTotal").text(this.tempScore);
  }
  return currentPlyr; //determines what player is currently active
}

Score.prototype.stopTurn = function() { //stops and stores dice rolls into total score
  this.addTotal(this.tempScore);
  this.tempScore = 0;
  $("#currentSubTotal").text(0);
  $("#currentPlayerOne").toggle();
  $("#currentPlayerTwo").toggle();
  $("#playerButtons").toggle();
  $("#computerButton").toggle();

}

Score.prototype.addTemp = function(randRoll) {
  this.tempScore += randRoll;

}

// var timeoutID;
function delay() {
  // window.setTimeout(2000);
}

$(document).ready(function() {
  $("#currentPlayerOne").toggle();
  $("#playerButtons").toggle();
  $("button#rulesButton").click(function() {
    $('#rulesPigDice').toggle();
});
  var currentPlayer = 1;
  var p1 = new Score();
  var p2 = new Score();

  $(".diceRoll").click(function(event) {


    if (currentPlayer === 1) {
      currentPlayer = p1.playerTurn(currentPlayer);

    }
      else {
        currentPlayer = p2.computerPig(currentPlayer);

      }


  });

  $("#stopRoll").click(function(event) {
    if (currentPlayer === 1) {
      p1.stopTurn();
      $("#playerOneScore").text(p1.totalScore);
      currentPlayer = -1;
        if (p1.totalScore >= 50) {
          alert("Congratulations, Player One!  You have claimed victory in this game of pigs!  Bravo!")
          Replay();

        }

    }

  });

});
