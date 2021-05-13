const { Renderer } = require('electron');
const path = require('path');

window.addEventListener('DOMContentLoaded', () => {
    console.log("Preload was loaded");
    window.AImove = function(){
        const { spawn } = require('child_process');
        const childPython = spawn('python3.9',[path.join(__dirname,'scripts/TicTacToeAI.py'),parseBoard(board)]);
      
        blockGrid();
        
        childPython.stdout.on('data', (data) => { 
            var move = data.toString();
            console.log(`python out ${data}`);
            console.log(move);
            var i = move[1];
            var j = move[4];
            
            var id = i.toString()+j.toString();
            var block = document.getElementById(id);
      
            setTimeout(function(){ 
              changeBlock(block);
              updateBoard(block);
              unblockGrid();
             }, 1000);
            
          
        });
      
        childPython.stderr.on ('data',(data) =>{
          console.error(`python error  ${data}`);
        })




      
    };
  });