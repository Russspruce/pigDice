function Score() {
  this.tempScore = 0;
  this.totalScore = 0;

}

Score.prototype.addTotal = function(tempScore) {
  return this.totalScore + tempScore;

}

Score.prototype.addTemp = function(randRoll) {
  return this.tempScore + randRoll;

}


$(document).ready(function() {

  $("#currentPlayerTwo").hide();
  var currentPlayer = 1;
  var p1 = new Score();
  var p2 = new Score();
  var randRoll = 0;

  $("#diceRoll").click(function(event) {

     randRoll = 1 + Math.floor(Math.random() * 6);
      $("#currentDiceRoll").text(randRoll);


    if (currentPlayer === 1) {
      if (randRoll === 1) {
        p1.tempScore = 0;
        currentPlayer = 2;
        $("#currentSubTotal").text(p1.tempScore);
        $("#currentPlayerOne").hide();
        $("#currentPlayerTwo").show();
      } else {
        p1.tempScore = p1.addTemp(randRoll);
        $("#currentSubTotal").text(p1.tempScore);
      }
    }
      else {
        if (randRoll === 1) {
          p2.tempScore = 0;
          currentPlayer = 1;
          $("#currentSubTotal").text(p2.tempScore);
          $("#currentPlayerTwo").hide();
          $("#currentPlayerOne").show();
        } else {
          p2.tempScore = p2.addTemp(randRoll);
          $("#currentSubTotal").text(p2.tempScore);
        }
      }


  });

  $("#stopRoll").click(function(event) {

    if (currentPlayer === 1) {
      p1.totalScore = p1.addTotal(p1.tempScore);
      p1.tempScore = 0;
      $("#playerOneScore").text(p1.totalScore);
      currentPlayer = 2;
      $("#currentPlayerOne").hide();
      $("#currentPlayerTwo").show();

    } else {
      p2.totalScore = p2.addTotal(p2.tempScore)
      p2.tempScore = 0;
      $("#playerTwoScore").text(p2.totalScore);
      currentPlayer = 1;
      $("#currentPlayerTwo").hide();
      $("#currentPlayerOne").show();
    }



  });

});
