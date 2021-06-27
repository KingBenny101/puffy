




function windowResize() {
  var w = 800;
  var h = 600;

  w = w + outerWidth - innerWidth;
  h = h + outerHeight - innerHeight;

  resizeTo(w, h);
  console.log(w);
  console.log(h);
}
function home() {
  location.replace("index.html");
}
function displayMessage(str) {
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";
  var content = document.getElementById("message");
  content.innerHTML = str;

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

var turns = 0;
var moves = 0;
var board = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];
var winner = -1;

function changeBlock(block) {
  if (block.childNodes.length) {
    return 0;
  }

  var img = document.createElement("IMG");
  block.appendChild(img);
  var player1 = document.getElementById("player1");
  var player2 = document.getElementById("player2");

  if (turns == 0) {
    img.setAttribute("src", "images/x.png");
    turns = 1;
    moves++;
    player2.style.background = "#00ff00";
    player1.style.background = "#959595";
  } else {
    img.setAttribute("src", "images/o.png");
    turns = 0;
    moves++;
    player1.style.background = "#ff0000";
    player2.style.background = "#959595";
  }

  return 1;
}
function updateBoard(block) {
  var index = block.getAttribute("id");
  var i = parseInt(index[0]);
  var j = parseInt(index[1]);

  if (turns) {
    board[i][j] = 1;
  } else {
    board[i][j] = 0;
  }
  checkBoard();
}
function checkBoard() {
  if (moves == 9) {
    displayMessage("The game is a draw!!!");
  }
  if (turns) {
    //X
    //horixontal
    var i;
    for (i = 0; i < 3; i++) {
      if (checkRow(1, i)) {
        winner = 1;
        break;
      }
    }

    //vertical
    for (i = 0; i < 3; i++) {
      if (checkColumn(1, i)) {
        winner = 1;
        break;
      }
      //diagonal
      if (checkDiagonal1(1)) {
        winner = 1;
      }

      if (checkDiagonal2(1)) {
        winner = 1;
      }
    }
  } else {
    //O
    //horizontal
    var i;
    for (i = 0; i < 3; i++) {
      if (checkRow(0, i)) {
        winner = 0;
        break;
      }
    }

    //vertical
    for (i = 0; i < 3; i++) {
      if (checkColumn(0, i)) {
        winner = 0;
        break;
      }
    }

    //diagonal
    if (checkDiagonal1(0)) {
      winner = 0;
    }

    if (checkDiagonal2(0)) {
      winner = 0;
    }
  }

  if (winner == 1) {
    displayMessage("Player 1 is the winner!!!");
  } else if (winner == 0) {
    displayMessage("Player 2 is the winner!!!");
  }
}
function checkRow(val, row) {
  var i;
  var check = 1;
  for (i = 0; i < 3; i++) {
    if (board[row][i] != val) {
      check = 0;
      break;
    }
  }
  return check;
}
function checkColumn(val, col) {
  var i;
  var check = 1;
  for (i = 0; i < 3; i++) {
    if (board[i][col] != val) {
      check = 0;
      break;
    }
  }
  return check;
}
function checkDiagonal1(val) {
  var i;
  var check = 1;

  for (i = 0; i < 3; i++) {
    if (board[i][i] != val) {
      check = 0;
      break;
    }
  }

  return check;
}
function checkDiagonal2(val) {
  var i;
  var check = 1;

  for (i = 0; i < 3; i++) {
    if (board[i][2 - i] != val) {
      check = 0;
      break;
    }
  }

  return check;
}

function playerVplayer() {
  localStorage.setItem("gamemode", "0");
  location.href = "client/index.html";
}
function playerVcomputer() {
  localStorage.setItem("gamemode", "1");
  var option1 = document.getElementsByClassName("v10_53")[0];
  var option2 = document.getElementsByClassName("v10_56")[0];

  option1.textContent = "Go First";
  option2.textContent = "Go Second";

  option1.setAttribute(
    "onclick",
    "AIgoSecond();location.replace('game.html');"
  );
  option2.setAttribute("onclick", "AIgoFirst();location.replace('game.html');");
}

function AIgoFirst() {
  localStorage.setItem("AIorder", "1");
}

function AIgoSecond() {
  localStorage.setItem("AIorder", "0");
}

async function gamestart() {
  if (localStorage.getItem("gamemode") == "1") {
    if (localStorage.getItem("AIorder") == "1") {
      document.getElementsByClassName("v1_17")[0].textContent = "AI";
      document.getElementsByClassName("v1_18")[0].textContent = "Player";
      var i;
      var j;
      for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
          var id = i.toString() + j.toString();
          var block = document.getElementById(id);
          block.setAttribute(
            "onclick",
            "changeBlock(this);updateBoard(this);window.AImove()"
          );
        }
      }
      window.AImove();
    } else if (localStorage.getItem("AIorder") == "0") {
      document.getElementsByClassName("v1_17")[0].textContent = "Player";
      document.getElementsByClassName("v1_18")[0].textContent = "AI";
      var i;
      var j;
      for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
          var id = i.toString() + j.toString();
          var block = document.getElementById(id);
          block.setAttribute(
            "onclick",
            "changeBlock(this);updateBoard(this);window.AImove()"
          );
        }
      }
    }
  } else if (localStorage.getItem("gamemode") == "0") {
    document.getElementsByClassName("v1_17")[0].textContent = "Player 1";
    document.getElementsByClassName("v1_18")[0].textContent = "Player 2";
  }
}

function parseBoard(board) {
  var parsed = "";
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (board[i][j] == -1) {
        parsed += "n";
      } else {
        parsed += board[i][j].toString();
      }
    }
    parsed += "a";
  }
  console.log(parsed);
  return parsed;
}

// function AImove(){
//   const { spawn } = require('child_process');
//   const childPython = spawn('python3.9',['TicTacToeAI.py',parseBoard(board)]);

//   blockGrid();

//   childPython.stdout.on('data', (data) => {
//       var move = data.toString();
//       console.log(`python out ${data}`);
//       console.log(move);
//       var i = move[1];
//       var j = move[4];

//       var id = i.toString()+j.toString();
//       var block = document.getElementById(id);

//       setTimeout(function(){
//         changeBlock(block);
//         updateBoard(block);
//         unblockGrid();
//        }, 1000);

//   });

//   childPython.stderr.on ('data',(data) =>{
//     console.error(`python error  ${data}`);
//   })
// }

function unblockGrid() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var id = i.toString() + j.toString();
      var block = document.getElementById(id);
      block.setAttribute(
        "onclick",
        "changeBlock(this);updateBoard(this);window.AImove()"
      );
    }
  }
}

function blockGrid() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var id = i.toString() + j.toString();
      var block = document.getElementById(id);
      block.setAttribute("onclick", "console.log('Blocked')");
    }
  }
}
