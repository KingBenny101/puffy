import eel
from TicTacToeAI import bestMove

eel.init('web')



@eel.expose
def TicTakToeAIwrapper(board):
    return bestMove(board)



eel.start('index.html',size = (816,639),block = False)


while True:
    eel.sleep(10)