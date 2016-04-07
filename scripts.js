function Score() {
  this.tempScore = 0;
  this.totalScore = 0;
  this.turnOrder = 1;
}

function Replay() { //Gives message for replay that will refresh page
  var response = confirm("Would you like to play again?");
   if(response)location.reload();
}

Score.prototype.addTotal = function(tempScore) {
  this.totalScore += tempScore;

}

Score.prototype.playerTurn = function(current, randRoll) { //goes through roll and calculates points
  if (randRoll === 1) {
    this.tempScore = 0;
    currentPlayer = (currentPlayer * -1);
    $("#currentSubTotal").text(this.tempScore);
  } else {
    this.addTemp(randRoll);
    $("#currentSubTotal").text(this.tempScore);
  }
  return currentPlayer; //determines what player is currently active
}

Score.prototype.stopTurn = function() { //stops and stores dice rolls into total score
  this.addTotal(this.tempScore);
  this.tempScore = 0;
  $("#currentSubTotal").text(0);
}

Score.prototype.addTemp = function(randRoll) {
  this.tempScore += randRoll;

}
  var currentPlayer = 1;

$(document).ready(function() {
  $("button#rulesButton").click(function() {
    $('#rulesPigDice').toggle();
});
  $("#currentPlayerTwo").hide();
  var p1 = new Score();
  var p2 = new Score();
  var randRoll = 0;

  $("#diceRoll").click(function(event) {

     randRoll = 1 + Math.floor(Math.random() * 6);
      $("#currentDiceRoll").text(randRoll);

    if (currentPlayer === 1) {
      currentPlayer = p1.playerTurn(currentPlayer, randRoll);
      if (currentPlayer === -1) {
        $("#currentPlayerOne").hide();
        $("#currentPlayerTwo").show();
      }
    }
      else {
        currentPlayer = p2.playerTurn(currentPlayer, randRoll);
        if (currentPlayer === 1) {
          $("#currentPlayerTwo").hide();
          $("#currentPlayerOne").show();
        }
      }


  });

  $("#stopRoll").click(function(event) {
    if (currentPlayer === 1) {
      p1.stopTurn();
      $("#playerOneScore").text(p1.totalScore);
      currentPlayer = -1;
      $("#currentPlayerOne").hide();
      $("#currentPlayerTwo").show();
        if (p1.totalScore >= 50) {
          alert("Congratulations, Player One!  You have claimed victory in this game of pigs!  Bravo!")
          Replay();

        }

    } else {
      p2.stopTurn();
      $("#playerTwoScore").text(p2.totalScore);
      currentPlayer = 1;
      $("#currentPlayerTwo").hide();
      $("#currentPlayerOne").show();
        if (p2.totalScore >= 50) {
          alert("Awesome, Player Two!  You have mastered this game and are the reigning champion!")
          Replay();
        }
    }


  });

});
