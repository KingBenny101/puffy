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

  if (turns == 0) {
    img.setAttribute("src", "images/x.png");
    turns = 1;
    moves++;
  } else {
    img.setAttribute("src", "images/o.png");
    turns = 0;
    moves++;
  }

  return 1;
}
function updateBoard(block) {
  console.log("update board");
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
  console.log("checking board");
  if (moves == 9) {
    gameOver();
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
    gameOver();
    displayMessage("X is the winner!!!");
  } else if (winner == 0) {
    gameOver();
    displayMessage("O is the winner!!!");
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
function unblockGrid() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var id = i.toString() + j.toString();
      var block = document.getElementById(id);
      block.setAttribute("onclick", "movePlayed(this)");
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
function resetGame() {
  console.log("resetting!!");
  turns = 0;
  moves = 0;
  board = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ];
  winner = -1;

  blockGrid();

  console.log("loop");
  for (var i=0; i < 3; i++) {
    console.log("loop is running");
    for (var j=0; j < 3; j++) {
      var id = i.toString() + j.toString();
      var block = document.getElementById(id);
      block.innerHTML = "";
    }
  }
  console.log("loop end");
  var playerBlock = document.getElementsByClassName("v15_10")[0];
  playerBlock.style.backgroundColor = "red";
}
function displayMessage(str) {
  console.log("display message ran");
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
