import { findPiece, charToNum } from "./utils"

const getSquare = (selectedPiece) => {
    return {'row': selectedPiece.row, 'col': charToNum(selectedPiece.column)};
}

const getSquareUp = (square) => {
    if (square){
        return {'row': square.row + 1, 'col': charToNum(square.col)};
    }
    return null;
}

const get2SquareUp = (square) => {
    if (square){
        return {'row': square.row + 2, 'col': charToNum(square.col)}
    }
    return null;
}

const getSquareUpRight = (square) => {
    if (square){
        return {'row': square.row + 1, 'col': charToNum(square.col) + 1};
    }
    return null;
}

const getSquareUpLeft = (square) => {
    if (square){
        return {'row': square.row + 1, 'col': charToNum(square.col) - 1};
    }
    return null;
}

const getSquareDown = (square) => {
    if (square){
        return {'row': square.row - 1, 'col': charToNum(square.col)};
    }
    return null;
}

const get2SquareDown = (square) => {
    if (square){
        return {'row': square.row - 2, 'col': charToNum(square.col)}
    }
    return null;
}

const getSquareDownLeft = (square) => {
    if (square){
        return {'row': square.row - 1, 'col': charToNum(square.col) - 1};
    }
    return null;
}

const getSquareDownRight = (square) => {
    if (square){
        return {'row': square.row - 1, 'col': charToNum(square.col) + 1};
    }
    return null;
}


const getSquareRight = (square) => {
    if (square){
        return {'row': square.row, 'col': charToNum(square.col) + 1}
    }
    return null;
}

const getSquareLeft = (square) => {
    if (square){
        return {'row': square.row, 'col': charToNum(square.col) - 1}
    }
    return null;
}





export const trajectoryPawn = (selectedPiece, board) => {
    let possibleMoves = []
    const square = getSquare(selectedPiece);
    if(selectedPiece.color === 'white'){
        //move up
        const squareUp = getSquareUp(square);
        if(!findPiece(board, squareUp.row, squareUp.col)){
            possibleMoves.push(squareUp)
            //move up by 2
            if (square.row === 2){
                const square2Ups = get2SquareUp(square);
                if(!findPiece(board, square2Ups.row, square2Ups.col)){
                    possibleMoves.push(square2Ups)
                }
            }
        }
        //move diagonally to kill
        const squareUpRight = getSquareUpRight(square);
        let pieceToKill = findPiece(board, squareUpRight.row, squareUpRight.col);
        if(pieceToKill && pieceToKill.color === 'black'){
            possibleMoves.push(squareUpRight);
        }
        const squareUpLeft = getSquareUpLeft(square);
        pieceToKill = findPiece(board, squareUpLeft.row, squareUpLeft.col);
        if(pieceToKill && pieceToKill.color === 'black'){
            possibleMoves.push(squareUpLeft)
        }
    } else { // PEZZO NERO
        const squareDown = getSquareDown(square);
        if(!findPiece(board, squareDown.row, squareDown.col)){
            possibleMoves.push(squareDown)
            // down by 2
            if (square.row === 7){

                const square2Downs = get2SquareDown(square);
                if(!findPiece(board, square2Downs.row, square2Downs.col)){
                    possibleMoves.push(square2Downs)
                }
            }
        }
        //move diagonally to kill
        const squareDownRight = getSquareDownRight(square)
        let pieceToKill = findPiece(board, squareDownRight.row, squareDownRight.col);
        if(pieceToKill && pieceToKill.color === 'white'){
            possibleMoves.push(squareDownRight)
        }
        const squareDownLeft = getSquareDownLeft(square)
        pieceToKill = findPiece(board, squareDownLeft.row, squareDownLeft.col);
        if(pieceToKill && pieceToKill.color === 'white'){
            possibleMoves.push(squareDownLeft)
        }
    }
    return possibleMoves
}


export const trajectoryBishop = (selectedPiece, board) => {
    let possibleMoves = [];
    let square = getSquare(selectedPiece);
    // UP RIGHT
    let offSet = 1;
    while (square.row + offSet <= 8 && square.col + offSet <= 8 && !findPiece(board, square.row + offSet, square.col + offSet)){
        possibleMoves.push({'row': square.row + offSet, 'col': square.col + offSet});
        offSet++;
    }
    if (square.row + offSet <= 8 && square.col + offSet <= 8 && findPiece(board, square.row + offSet, square.col + offSet) && findPiece(board, square.row + offSet, square.col + offSet).color !== selectedPiece.color){
        possibleMoves.push({'row': square.row + offSet, 'col': square.col + offSet});
    }
    // UP LEFT
    offSet = 1;
    while(square.row + offSet <= 8 && square.col - offSet >= 1 && !findPiece(board, square.row + offSet, square.col - offSet)){
        possibleMoves.push({'row': square.row + offSet, 'col': square.col - offSet});
        offSet++;
    }
    if(square.row + offSet <= 8 && square.col - offSet >= 1 && findPiece(board, square.row + offSet, square.col - offSet) && findPiece(board, square.row + offSet, square.col - offSet).color !== selectedPiece.color){
        possibleMoves.push({'row': square.row + offSet, 'col': square.col - offSet});
    }
    // DOWN RIGHT
    offSet = 1;
    while(square.row - offSet >= 1 && square.col + offSet <= 8 && !findPiece(board, square.row - offSet, square.col + offSet)){
        possibleMoves.push({'row': square.row - offSet, 'col': square.col + offSet});
        offSet++;
    }
    if(square.row - offSet >= 1 && square.col + offSet <= 8 && findPiece(board, square.row - offSet, square.col + offSet) && findPiece(board, square.row - offSet, square.col + offSet).color !== selectedPiece.color){
        possibleMoves.push({'row': square.row - offSet, 'col': square.col + offSet});
    }
    // DOWN LEFT
    offSet = 1;
    while(square.row - offSet >= 1 && square.col - offSet >= 1 && !findPiece(board, square.row - offSet, square.col - offSet)){
        possibleMoves.push({'row': square.row - offSet, 'col': square.col - offSet});
        offSet++;
    }
    if(square.row - offSet >= 1 && square.col - offSet >= 1 && findPiece(board, square.row - offSet, square.col - offSet) && findPiece(board, square.row - offSet, square.col - offSet).color !== selectedPiece.color){
        possibleMoves.push({'row': square.row - offSet, 'col': square.col - offSet});
    }
    return possibleMoves;
}


export const trajectoryKing = (selectedPiece, board) => {
    let possibleMoves = []
    const square = getSquare(selectedPiece)
    const squareUp = getSquareUp(square)
    let piece = findPiece(board, squareUp.row, squareUp.col)
    if(!piece || piece.color != selectedPiece.color){
        possibleMoves.push(squareUp)
    }
    const squareUpRight = getSquareUpRight(square)
    piece = findPiece(board, squareUpRight.row, squareUpRight.col)
    if(!piece || piece.color != selectedPiece.color){
        possibleMoves.push(squareUpRight)
    }
    const squareRight = getSquareRight(square)
    piece = findPiece(board, squareRight.row, squareRight.col)
    if(!piece || piece.color != selectedPiece.color){
        possibleMoves.push(squareRight)
    }
    const squareDownRight = getSquareDownRight(square)
    piece = findPiece(board, squareDownRight.row, squareDownRight.col)
    if(!piece || piece.color != selectedPiece.color){
        possibleMoves.push(squareDownRight)
    }
    const squareDown = getSquareDown(square)
    piece = findPiece(board, squareDown.row, squareDown.col)
    if(!piece || piece.color != selectedPiece.color){
        possibleMoves.push(squareDown)
    }
    const squareDownLeft = getSquareDownLeft(square)
    piece = findPiece(board, squareDownLeft.row, squareDownLeft.col)
    if(!piece || piece.color != selectedPiece.color){
        possibleMoves.push(squareDownLeft)
    }
    const squareLeft = getSquareLeft(square)
    piece = findPiece(board, squareLeft.row, squareLeft.col)
    if(!piece || piece.color != selectedPiece.color){
        possibleMoves.push(squareLeft)
    }
    const squareUpLeft = getSquareUpLeft(square)
    piece = findPiece(board, squareUpLeft.row, squareUpLeft.col)
    if(!piece || piece.color != selectedPiece.color){
        possibleMoves.push(squareUpLeft)
    }
    return possibleMoves
}


export const trajectoryKnight = (selectedPiece, board) => {
    let possibleMoves = []
    const square = getSquare(selectedPiece)
    console.log(getSquareUp(square))
    const squareUUL = getSquareLeft(get2SquareUp(square))
    let piece = findPiece(board, squareUUL.row, squareUUL.col)
    if(!piece || piece.color != selectedPiece.color){
        possibleMoves.push(squareUUL)
    }
    const squareUUR = getSquareRight(get2SquareUp(square))
    piece = findPiece(board, squareUUR.row, squareUUR.col)
    if(!piece || piece.color != selectedPiece.color){
        possibleMoves.push(squareUUR)
    }
    const squareURR = getSquareRight(getSquareRight(getSquareUp(square)))
    piece = findPiece(board, squareURR.row, squareURR.col)
    if(!piece || piece.color != selectedPiece.color){
        possibleMoves.push(squareURR)
    }
    const squareDRR = getSquareRight(getSquareRight(getSquareDown(square)))
    piece = findPiece(board, squareDRR.row, squareDRR.col)
    if(!piece || piece.color != selectedPiece.color){
        possibleMoves.push(squareDRR)
    }
    const squareDDR = getSquareRight(get2SquareDown(square))
    piece = findPiece(board, squareDDR.row, squareDDR.col)
    if(!piece || piece.color != selectedPiece.color){
        possibleMoves.push(squareDDR)
    }
    const squareDDL = getSquareLeft(get2SquareDown(square))
    piece = findPiece(board, squareDDL.row, squareDDL.col)
    if(!piece || piece.color != selectedPiece.color){
        possibleMoves.push(squareDDL)
    }
    const squareDLL = getSquareLeft(getSquareLeft(getSquareDown(square)))
    piece = findPiece(board, squareDLL.row, squareDLL.col)
    if(!piece || piece.color != selectedPiece.color){
        possibleMoves.push(squareDLL)
    }
    const squareULL = getSquareLeft(getSquareLeft(getSquareUp(square)))
    piece = findPiece(board, squareULL.row, squareULL.col)
    if(!piece || piece.color != selectedPiece.color){
        possibleMoves.push(squareULL)
    }
    console.log(possibleMoves)
    return possibleMoves
}


export const trajectoryRook = (selectedPiece, board) => {
    let possibleMoves = [];
    let square = getSquare(selectedPiece);
    // UP
    let offSet = 1;
    while(square.row + offSet <= 8 && !findPiece(board, square.row + offSet, square.col)){
        possibleMoves.push({'row': square.row + offSet, 'col': square.col});
        offSet++;
    }
    if (square.row + offSet <= 8 && findPiece(board, square.row + offSet, square.col) && findPiece(board, square.row + offSet, square.col).color !== selectedPiece.color){
        possibleMoves.push({'row': square.row + offSet, 'col': square.col});
    }
    // DOWN
    offSet = 1;
    while(square.row - offSet >= 1 && !findPiece(board, square.row - offSet, square.col)){
        possibleMoves.push({'row': square.row - offSet, 'col': square.col});
        offSet++;
    }
    if(square.row - offSet >= 1 && findPiece(board, square.row - offSet, square.col) && findPiece(board, square.row - offSet, square.col).color !== selectedPiece.color){
        possibleMoves.push({'row': square.row - offSet, 'col': square.col});
    }
    // LEFT
    offSet = 1;
    while(square.col - offSet >= 1 && !findPiece(board, square.row, square.col - offSet)){
        possibleMoves.push({'row': square.row, 'col': square.col - offSet});
        offSet++;
    }
    if(square.col - offSet >= 1 && findPiece(board, square.row, square.col - offSet) && findPiece(board, square.row, square.col - offSet).color !== selectedPiece.color){
        possibleMoves.push({'row': square.row, 'col': square.col - offSet});
    }
    // RIGHT
    offSet = 1;
    while(square.col + offSet <= 8 && !findPiece(board, square.row, square.col + offSet)){
        possibleMoves.push({'row': square.row, 'col': square.col + offSet});
        offSet++;
    }
    if(square.col + offSet <= 8 && findPiece(board, square.row, square.col + offSet) && findPiece(board, square.row, square.col + offSet).color !== selectedPiece.color){
        possibleMoves.push({'row': square.row, 'col': square.col + offSet});
    }

    return possibleMoves;
}