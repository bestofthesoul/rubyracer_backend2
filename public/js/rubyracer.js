var status = false;
var game;
var show_date;

var end;
var timetaken;
var start;

var position1 = 0;

var position2 = 0;

// Triggers
$(document).ready(function() {
  $('button#1').click(function() {
    location.reload();
  });

// 2ND PART - IF PRESS UP/DOWN KEY
// move_one_position OF PLAYER (USE KEYUP ALSO WORKS)
  $(document).on('keyup', function(event) {
    var code = event.keyCode || event.which;    

    if (code == 13) { // # PRESS ENTER TO START GAME
      console.log("ENTER");
      gamestart();
    }
    
    // STATUS WILL BE TRUE AFTER SUCCESSFULLY gamestart
    if (status == "true") {

      if(code == 38) {
        console.log("Player 1 pressed");
        position1 = update_player_position('player1', position1);
        document.querySelector('.result1').innerHTML = "Player 1 - track: " + position1;

        check();

      } else if(code == 40) {

        position2 = update_player_position('player2', position2);
        document.querySelector('.result2').innerHTML = "Player 2 - track: " + position2;

        check();
      }
      else {

      }
    }
  });

});


// TO END GAME
function gameend (winner, player1, player2, timetaken) {
  status = false;
  end = new Date();
  e = end.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$2$3");
  var timetaken = end - start;
  document.querySelector('.timestart').innerHTML = "Start time: "+ i;
  document.querySelector('.timeend').innerHTML = "End time: "+ e;
  document.querySelector('.timetaken').innerHTML = "Time taken: " + Math.round(timetaken/1000) + " seconds";
  var gameId = $("#2").data("game-id")
  var url = '/games/' + gameId 
  $.ajax({
    type: 'patch',
    url: url,
    data: {"winner": winner, "player1": player1, "player2": player2, "time_taken": timetaken },
    success: function(e) {
      window.location = url + "/stats"
    },
    error: function(){
      alert('failure');
    }
  });
}


// TO MOVE ONE POSITION
function update_player_position(person, position){
  if (person == 'player1'){
    $("#player1_strip > td.active").removeClass('active').next().addClass('active');}
  else {
    $("#player2_strip > td.active").removeClass('active').next().addClass('active');}
  position = position + 1;
  return position;
}


// #TO START GAME
function gamestart(){
  status = true;
  start = new Date();
  i = start.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$2$3");
  show_date = i;
}

// CHECK IF APPROACHING END
function check(){
  if (position1 >= 15) {
    document.querySelector('.result1').innerHTML = "Player 1 - track: " + position1;
    document.querySelector('.winner').innerHTML = "Winner: Player 1!";
    var winner = $("#2").data("player1-id");
    var player1 = $("#2").data("player1-id");
    var player2 = $("#2").data("player2-id");
    gameend(winner, player1, player2, timetaken);
  }
  else if (position2 >= 15) {
    document.querySelector('.result2').innerHTML = "Player 2 - track: " + position2;
    document.querySelector('.winner').innerHTML = "Winner: Player 2!";
    var winner = $("#2").data("player2-id");
    var player1 = $("#2").data("player1-id");
    var player2 = $("#2").data("player2-id");
    gameend(winner, player1, player2, timetaken);
  }
}
