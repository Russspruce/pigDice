var currentPlayer = 1;

function Score() {
  this.tempScore = 0;
  this.totalScore = 0;

}

function Replay() {
  var response = confirm("Would you like to play again?");
   if(response)location.reload();
}

Score.prototype.turn = function(randRoll1, randRoll2) {

}

Score.prototype.addTotal = function(tempScore) {
  this.totalScore += tempScore;

}

Score.prototype.addTemp = function(randRoll1, randRoll2) {
  this.tempScore += (randRoll1 + randRoll2);

}

Score.prototype.doubles = function(randRoll1) {
  this.tempScore += (randRoll1 * randRoll1);
}


$(document).ready(function() {

  $("#currentPlayerTwo").hide();

  var p1 = new Score();
  var p2 = new Score();
  var randRoll1 = 0;
  var randRoll2 = 0;

  $("#diceRoll").click(function(event) {

     randRoll1 = 1 + Math.floor(Math.random() * 6);
     randRoll2 = 1 + Math.floor(Math.random() * 6);
      $("#diceRollOne").text(randRoll1);
      $("#diceRollTwo").text(randRoll2);

    if (currentPlayer === 1) {
      if (randRoll1 === 1 && randRoll2 === 1) {
        p1.totalScore = 0;
        p1.tempScore = 0;
        currentPlayer = 2;
        $("#playerOneScore").text(p1.totalScore);
        $("#currentSubTotal").text(p1.tempScore);
        $("#currentPlayerOne").hide();
        $("#currentPlayerTwo").show();
      }

      else if (randRoll1 === 1 || randRoll2 === 1) {
        p1.tempScore = 0;
        currentPlayer = 2;
        $("#currentSubTotal").text(p1.tempScore);
        $("#currentPlayerOne").hide();
        $("#currentPlayerTwo").show();
      }
      else if (randRoll1 === randRoll2) {
        p1.doubles(randRoll1);
        $("#currentSubTotal").text(p1.tempScore);
      }
      else {
        p1.addTemp(randRoll1, randRoll2);
        $("#currentSubTotal").text(p1.tempScore);
      }
    }
    else {  //Player Two conditional statements
      if (randRoll1 === 1 && randRoll2 === 1) {
        p2.totalScore = 0;
        p2.tempScore = 0;
        currentPlayer = 1;
        $("#playerTwoScore").text(p2.totalScore);
        $("#currentSubTotal").text(p2.tempScore);
        $("#currentPlayerTwo").hide();
        $("#currentPlayerOne").show();
        }
      else if (randRoll1 === 1 || randRoll2 === 1) {
        p2.tempScore = 0;
        currentPlayer = 1;
        $("#currentSubTotal").text(p2.tempScore);
        $("#currentPlayerTwo").hide();
        $("#currentPlayerOne").show();
      }
      else if (randRoll1 === randRoll2) {
        p2.doubles(randRoll1);
        $("#currentSubTotal").text(p2.tempScore);
      } else {
        p2.addTemp(randRoll1, randRoll2);
        $("#currentSubTotal").text(p2.tempScore);
      }
    }


  });

  $("#stopRoll").click(function(event) {

    if (currentPlayer === 1) {
      p1.addTotal(p1.tempScore);
      p1.tempScore = 0;
      $("#playerOneScore").text(p1.totalScore);
      $("#currentSubTotal").text(0);
      currentPlayer = 2;
      $("#currentPlayerOne").hide();
      $("#currentPlayerTwo").show();
        if (p1.totalScore >= 100) {
          alert("Great job, Player 1!  Your skill of the dice is no one's equal!")
          Replay();

        }
      }
   else {
    p2.addTotal(p2.tempScore)
    p2.tempScore = 0;
    $("#playerTwoScore").text(p2.totalScore);
    $("#currentSubTotal").text(0);
    currentPlayer = 1;
    $("#currentPlayerTwo").hide();
    $("#currentPlayerOne").show();
      if (p2.totalScore >= 100) {
        alert("Awesome, Player 2, you won!  You are the master of the pigs!")
        Replay();
        }
    }


  });

});
