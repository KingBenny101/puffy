const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { Socket } = require("dgram");

const app = express();
const server = http.createServer(app);
const io = socketio(server,{
  cors: {
    origin : "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

var rooms = [];

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  // JoinRoom
  socket.on("joinRoom", (user) => {
    // check if room already exits

    var allowed = true;
    var i,
      check = false;
    for (i = 0; i < rooms.length; i++) {
      if (rooms[i] == user.room) {
        check = true;
        break;
      }
    }
    if (check) {
      if(findUsersConnected(rooms[i])){
        if (findUsersConnected(rooms[i]).size == 2) {
          socket.emit("rejected", user.room);
          allowed = false;
        }
      }
      
    } else {
      rooms.push(user.room);
    }

    if (allowed) {
      // join room
      socket.join(user.room);

      // Broadcast when connect
      socket.broadcast
        .to(user.room)
        .emit("message", `Puffy : ${user.username} connected`);

      // starting the game
      if (findUsersConnected(rooms[i]).size == 2) {
        io.to(user.room).emit("message", "Puffy : The Game will start soon!!!");
        var k = 5;
        for (var j = 0; j < 5; j++) {
          setTimeout(function () {
            io.to(user.room).emit("message", `Puffy : ${k--}`);
          }, 1000 * (j + 1));
        }
        setTimeout(function () {
          io.to(user.room).emit("message", "Puffy : !LIVE");
          io.to(user.room).emit("message", "Puffy : !LIVE");
          io.to(user.room).emit("message", "Puffy : !LIVE");

          var players = findUsersConnected(user.room);
          var startfirst = getRandomItem(players);
          io.to(startfirst).emit("startFirst", "");
          console.log("send startFirst");
          console.log(players);
          console.log(startfirst);
        }, 6000);
      }
    }

    // ChatMessage
    socket.on("chatMessage", (message) => {
      const room = message.user.room;
      const username = message.user.username;
      const msg = message.msg;
      io.to(room).emit("message", `${username} : ${msg}`);
    });

    //move played
    socket.on("movePlayed", (move) => {
      var players = findUsersConnected(move.room);
      players = Array.from(players);
      var i = players.indexOf(socket.id);
      if (i) {
        io.to(players[0]).emit("makeMove", move.move);
      } else {
        io.to(players[1]).emit("makeMove", move.move);
      }
      console.log("sent makeMove");
    });

    //gameover
    socket.on("gameOver", (room) => {
        console.log("gameOver");  
      var players = findUsersConnected(room);
      players = Array.from(players);
      var i = players.indexOf(socket.id);
      if (i) {
        io.to(players[0]).emit("reset");
      } else {
        io.to(players[1]).emit("reset");
      }
      
      
      if (socket.id==players[0]) {
        io.to(room).emit("message", "The game will restart in 10 seconds.");
        if (findUsersConnected(room).size == 2) {
          var k = 10;
          for (var j = 0; j < 10; j++) {
            setTimeout(function () {
              io.to(room).emit("message", `Puffy : ${k--}`);
            }, 1000 * (j + 1));
          }
          setTimeout(function () {
            io.to(room).emit("message", "Puffy : !LIVE");
            io.to(room).emit("message", "Puffy : !LIVE");
            io.to(room).emit("message", "Puffy : !LIVE");

            var players = findUsersConnected(room);
            var startfirst = getRandomItem(players);
            io.to(startfirst).emit("startFirst", "");
          }, 10000);
        }
      }
    });
    //Leave Room
    socket.on("leaveRoom", (user) => {
      if (findUsersConnected(user.room).size == 1) {
        const roomi = rooms.indexOf(user.room);
        rooms.splice(roomi, 1);
      }
      io.to(user.room).emit('reset');
      socket.leave(user.room);
    });
  });
  // JoinPublic

  socket.on("joinPublic" ,(username) => {
    const PUBLIC_ID = "public27"; 
    socket.join(PUBLIC_ID);
    socket.broadcast.emit('publicMessage',`${username} has joined`);



    socket.on('publicMessageFromClient',(data) => {
      const username = data.username;
      const message = data.message;
      io.to(PUBLIC_ID).emit('publicMessage',`${username}: ${message}`);
      
    });


    socket.on("leavePublic",(username) => {
      socket.leave(PUBLIC_ID);
      io.to(PUBLIC_ID).emit('publicMessage',`${username} has left`);
    });
  });

  // GetRoomData 
  socket.on("getRoomData",() => {
    socket.emit('roomData',getRoomData());
    console.log("room data sent");
  });
  // Diconnect
  socket.on("disconnect", () => {
    // Broadcast when disconnect
    io.emit("message", "Puffy : An user disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

function findUsersConnected(room) {
  const clients = io.sockets.adapter.rooms.get(room);
  return clients;
}

function getRandomItem(set) {
  let items = Array.from(set);
  return items[Math.floor(Math.random() * items.length)];
}

function getRoomData(){
  var parsedRoomList = [];
 
  for (var i = 0 ; i < rooms.length;i++){
    const room = rooms[i];
    if(findUsersConnected(room)){
      var usersConnected = findUsersConnected(room);
      const userCount = usersConnected.size;
    
      if(userCount == 1){
    
        parsedRoomList.push(room);
      }
      
    }
  }
  console.log(parsedRoomList);
  return parsedRoomList;
}

