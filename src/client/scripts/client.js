const socket = io('https://puffy-online.herokuapp.com/');
// THIS IS THE CLIENT

socket.on("message", (message) => {
  outputMessage(message);
});

socket.on("rejected", (room) => {
  window.alert(`Room ${room} is full. Please join other rooms.`);
  window.history.back();
});

socket.on("startFirst", (data) => {
  startFirst();
});

socket.on("makeMove", (move) => {
  makeMove(move);
});

socket.on("reset", () => {
  resetGame();
});

function outputMessage(message) {
  var chat = document.getElementById("chat");
  var msgElement = document.createElement("li");
  msgElement.textContent = message;
  chat.appendChild(msgElement);

  chat.scrollTop = chat.scrollHeight;
}

// GAME FUNCTIONS
function loadGame() {
  var username = document.getElementById("username").value;
  var room = document.getElementById("room").value;
  if (username == "" || room == "") {
    window.alert("Enter valid options.");
  } else {
    localStorage.setItem("username", username);
    localStorage.setItem("room", room);
    location.href = "pvp.html";
  }
}

// function runs when pvp loaded
function startGame() {
  const username = localStorage.getItem("username");
  const room = localStorage.getItem("room");
  var player = document.getElementsByClassName("v15_11")[0];
  player.textContent = username;

  joinroom();

  // sending message from client
  const messagebar = document.getElementById("messagebar");
  messagebar.addEventListener("submit", (e) => {
    e.preventDefault();

    var msg = e.target.elements.messagebox.value;

    const message = {
      user: {
        username: username,
        room: room,
      },
      msg: msg,
    };
    // Emit ChatMesage to server
    socket.emit("chatMessage", message);

    // focusing and scrolling the chat
    e.target.elements.messagebox.value = "";
    e.target.elements.messagebox.focus();
  });
  blockGrid();
}

function gameOver() {
  const room = localStorage.getItem("room");
  socket.emit("gameOver", room);
}

// Join Room
function joinroom() {
  const username = localStorage.getItem("username");
  const room = localStorage.getItem("room");

  const user = {
    username: username,
    room: room,
  };
  socket.emit("joinRoom", user);
}

// Leave Room
function leaveRoom() {
  const username = localStorage.getItem("username");
  const room = localStorage.getItem("room");

  const user = {
    username: username,
    room: room,
  };
  socket.emit("leaveRoom", user);
  location.replace("index.html");
}

function startFirst() {
  var playerBlock = document.getElementsByClassName("v15_10")[0];
  playerBlock.style.backgroundColor = "green";
  const username = document.getElementsByClassName("v15_11")[0].textContent;
  const room = localStorage.getItem("room");
  const message = {
    user: {
      username: "Puffy",
      room: room,
    },
    msg: `${username} will start first.`,
  };
  socket.emit("chatMessage", message);
  unblockGrid();
}

function makeMove(move) {
  var block = document.getElementById(move);
  changeBlock(block);
  updateBoard(block);
  var playerBlock = document.getElementsByClassName("v15_10")[0];
  playerBlock.style.backgroundColor = "green";
  unblockGrid();
}

function movePlayed(block) {
  blockGrid();
  var index = block.getAttribute("id");
  const room = localStorage.getItem("room");
  move = {
    room: room,
    move: index,
  };
  socket.emit("movePlayed", move);
  console.log("sent move played");
  changeBlock(block);
  updateBoard(block);
  var playerBlock = document.getElementsByClassName("v15_10")[0];
  playerBlock.style.backgroundColor = "red";
}
