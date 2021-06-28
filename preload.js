const path = require("path");
const { Renderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  window.AImove = function () {
    const { spawn } = require("child_process");
    //const childPython = spawn('python3.9',[path.join(__dirname,'externalScripts/TicTacToeAI.py'),parseBoard(board)]);

    AIpath = "externalScripts/";
    if (process.platform == "linux") {
      AIpath += "TicTacToeAI";
    }
    if (process.platform == "win32") {
      AIpath += "TicTacToeAI.exe";
    }
    const childPython = spawn(
      path.join(__dirname, AIpath).replace("app.asar", "app.asar.unpacked"),
      [parseBoard(board)]
    );
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
  // version and autoupdate stuff
  window.updateVersion = function () {
    const { ipcRenderer } = require("electron");
    const version = document.getElementById("version");

    ipcRenderer.send("app_version");
    ipcRenderer.on("app_version", (event, arg) => {
      ipcRenderer.removeAllListeners("app_version");
      version.innerText = "Version " + arg.version;
    });

    ipcRenderer.on("message", function (event, text) {
      // Get the modal
      var modal = document.getElementById("myModal");

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];

      modal.style.display = "block";
      var modalText = document.getElementById("modal-text");
      modalText.innerHTML = text;

      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        modal.style.display = "none";
      };

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };

      console.log("Message from updater:", text);
    });

    console.log("UpdateVersion ran");
  };
});
console.log("Preload was loaded");
