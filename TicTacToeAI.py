import random



#I just put this in a separate file for better understanding. I suck






def checkDoubletRow(board,row,val):
    occupied = 0
    valOccupied = 0
    freeSpot = []
    for i in range(3):
        if board[row][i] == -1:
            freeSpot.append(i)
        if board[row][i] != -1:
            occupied += 1
        if board[row][i] == val:
            valOccupied += 1   

    if occupied == 3:
        return False   

    elif valOccupied == 2:
        return (row,freeSpot[0])

    else:
        return False    

def checkDoubletCol(board,col,val):
    occupied = 0
    valOccupied = 0
    freeSpot = []
    for i in range(3):
        if board[i][col] == -1:
            freeSpot.append(i)
        if board[i][col] != -1:
            occupied += 1
        if board[i][col] == val:
            valOccupied += 1   

    if occupied == 3:
        return False       

    elif valOccupied == 2:
        return (freeSpot[0],col)

    else:
        return False

def checkDoubletDia(board,val):
    occupied = 0
    valOccupied = 0
    freeSpot = []


    #right diagonal
    for i in range(3):
        if board[i][i] == -1:
            freeSpot.append((i,i))
        if board[i][i] != -1:
            occupied += 1
        if board[i][i] == val:
            valOccupied += 1

    if occupied == 3:
        return False       

    elif valOccupied == 2:
        return (freeSpot[0])

    else:
        return False


    #left diagonal
    occupied = 0
    valOccupied = 0
    freeSpot = []

    for i in range(3):
        if board[i][2-i] == -1:
            freeSpot.append((i,2-i))
        if board[i][2-i] != -1:
            occupied += 1
        if board[i][2-i] == val:
            valOccupied += 1
            
    if occupied == 3:
        return False       

    elif valOccupied == 2:
        return (freeSpot[0])

    else:
        return False    


def checkSingletRow(board,row,val):
    valOccupied = 0
    freeSpots = []
    for i in range(3):
        if board[row][i] == val:
            valOccupied += 1
        
        if board[row][i] == -1 :
            freeSpots.append((row,i))
        
        if board[row][i] != -1 and board[row][i] != val:
            return

        if valOccupied > 1:
            return

    return random.choice(freeSpots)

def checkSingletCol(board,col,val):
    valOccupied = 0
    freeSpots = []
    for i in range(3):
        if board[i][col] == val:
            valOccupied += 1

        if board[i][col] == -1 :
            freeSpots.append((i,col))
        

        if board[i][col] != -1 and board[i][col] != val:
            return

        if valOccupied > 1:
            return

    return random.choice(freeSpots)

def checkSingletDia(board,val):
    valOccupied = 0
    freeSpots = []
    for i in range(3):
        if board[i][i] == val:
            valOccupied += 1

        if board[i][i] == -1 :
            freeSpots.append((i,i))
        

        if board[i][i] != -1 and board[i][i] != val:
            return

        if valOccupied > 1:
            return

    return random.choice(freeSpots)


def bestMove(board):
    movesX = 0
    movesO = 0

    for row in board:
        for block in row:
            if block == 1:
                movesX += 1
            elif block == 0:
                movesO += 1

    totalMoves = movesX + movesO

    if totalMoves == 0:
        return (1,1)

    else:
        if totalMoves == 1:
            if board[1][1] != -1:
                index = [0,2]
                i = random.choice(index)
                j = random.choice(index)
                return (i,j)

            else:
                return (1,1)
        elif totalMoves == 2:
            occupiedBlocks = []
            for i in range(3):
                for j in range(3):        
                    if not board[i][j] == -1:
                        occupiedBlocks.append((i,j))

            while True:
                x = random.randint(0,2)
                y = random.randint(0,2)

                if (x,y) not in occupiedBlocks:
                    return (x,y)
    #above than two moves

    if(movesX == movesO):
        #checkrow

        for i in range(3):
            spot = checkDoubletRow(board,i,1)
            if spot:
                return spot


                    
        #checkcol
        for i in range(3):
            spot = checkDoubletCol(board,i,1)
            if spot:
                return spot
        #checkdia
        
        spot  = checkDoubletDia(board,1)
        if spot:
            return spot



        #oposite value
        #checkrow

        for i in range(3):
            spot = checkDoubletRow(board,i,0)
            if spot:
                return spot


                    
        #checkcol
        for i in range(3):
            spot = checkDoubletCol(board,i,0)
            if spot:
                return spot

        #checkdia
        spot  = checkDoubletDia(board,1)
        if spot:
            return spot



        #singlet
        
        for i in range(3):
            spot = checkSingletRow(board,i,1)
            if spot:
                return spot


                    
        #checkcol
        for i in range(3):
            spot = checkSingletCol(board,i,1)
            if spot:
                return spot
        #checkdia
        
        spot  = checkSingletDia(board,1)
        if spot:
            return spot

        #random free block

        freeSpots = []
        for i in range(3):
            for j in range(3):
                if board[i][j]== -1 :
                    freeSpots.append((i,j))

        return random.choice(freeSpots)            


    elif movesX > movesO:
        #checkrow

        for i in range(3):
            spot = checkDoubletRow(board,i,0)
            if spot:
                return spot


                    
        #checkcol
        for i in range(3):
            spot = checkDoubletCol(board,i,0)
            if spot:
                return spot

        #checkdia
        spot  = checkDoubletDia(board,1)
        if spot:
            return spot

        #opposite value
        #checkrow

        for i in range(3):
            spot = checkDoubletRow(board,i,1)
            if spot:
                return spot


                    
        #checkcol
        for i in range(3):
            spot = checkDoubletCol(board,i,1)
            if spot:
                return spot
        #checkdia
        
        spot  = checkDoubletDia(board,1)
        if spot:
            return spot


        #singlet
        
        for i in range(3):
            spot = checkSingletRow(board,i,0)
            if spot:
                return spot


                    
        #checkcol
        for i in range(3):
            spot = checkSingletCol(board,i,0)
            if spot:
                return spot
        #checkdia
        
        spot  = checkSingletDia(board,0)
        if spot:
            return spot

        #random free block

        freeSpots = []
        for i in range(3):
            for j in range(3):
                if board[i][j]== -1 :
                    freeSpots.append((i,j))

        return random.choice(freeSpots)    


