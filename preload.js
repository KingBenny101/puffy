const { Renderer } = require("electron");
const path = require("path");

window.addEventListener("DOMContentLoaded", () => {
  console.log("Preload was loaded");
  window.AImove = function () {
    const { spawn } = require("child_process");
    //const childPython = spawn('python3.9',[path.join(__dirname,'externalScripts/TicTacToeAI.py'),parseBoard(board)]);

    if (process.platform == "linux") {
      const childPython = spawn(
        path.join(__dirname, "externalScripts/TicTacToeAI"),
        [parseBoard(board)]
      );
    }
    if (process.platform == "win32") {
      const childPython = spawn(
        path.join(__dirname, "externalScripts/TicTacToeAI.exe"),
        [parseBoard(board)]
      );
    }

    blockGrid();

    childPython.stdout.on("data", (data) => {
      var move = data.toString();
      console.log(`python out ${data}`);
      console.log(move);
      var i = move[1];
      var j = move[4];

      var id = i.toString() + j.toString();
      var block = document.getElementById(id);

      setTimeout(function () {
        changeBlock(block);
        updateBoard(block);
        unblockGrid();
      }, 1000);
    });

    childPython.stderr.on("data", (data) => {
      console.error(`python error  ${data}`);
    });
  };
});
