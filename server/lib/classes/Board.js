import {King, Knight, Pawn, Queen, Rook, Bishop} from "./Pieces.js";
import {Square} from "./Square.js";


export class Board {
    constructor(){
        this.pieceList = []
        this.squares = []
        const alphabet = "abcdefgh"
        for(let i = 1; i <= 8; i++){
            for(let j = 0; j < 8; j++){
                this.addSquare(i, alphabet[j].toString())
            }
        }
        this.getSquares().map(square => {
            if(square.getRow() === 2){
                this.addPiece('pawn', 'white', square)
            }
            if(square.getRow() === 7){
                this.addPiece('pawn', 'black', square)
            }
            if(square.getRow() === 1){
                if(square.getColumn() === 'a' || square.getColumn() === 'h'){
                    this.addPiece('rook', 'white', square)
                }
                if(square.getColumn() === 'b' || square.getColumn() === 'g'){
                    this.addPiece('knight', 'white', square)
                }
                if(square.getColumn() === 'c' || square.getColumn() === 'f'){
                    this.addPiece('bishop', 'white', square)
                }
                if(square.getColumn() === 'd'){
                    this.addPiece('queen', 'white', square)
                }
                if(square.getColumn() === 'e'){
                    this.addPiece('king', 'white', square)
                }
            }
            if(square.getRow() === 8){
                if(square.getColumn() === 'a' || square.getColumn() === 'h'){
                    this.addPiece('rook', 'black', square)
                }
                if(square.getColumn() === 'b' || square.getColumn() === 'g'){
                    this.addPiece('knight', 'black', square)
                }
                if(square.getColumn() === 'c' || square.getColumn() === 'f'){
                    this.addPiece('bishop', 'black', square)
                }
                if(square.getColumn() === 'd'){
                    this.addPiece('queen', 'black', square)
                }
                if(square.getColumn() === 'e'){
                    this.addPiece('king', 'black', square)
                }
            }
        })
    }

    getpieceList(){
        return this.pieceList
    }

    getSquares(){
        return this.squares
    }

    addSquare(row, column){
        const s = new Square(row, column, this)
        this.squares.push(s)
    }

    addPiece(type, color, square){
        const pieceConstructors = { //per mappare stringa tipo e nome classe da istanziare
            'pawn': Pawn,
            'rook': Rook,
            'knight': Knight,
            'bishop': Bishop,
            'queen': Queen,
            'king': King
        }
        const pieceConstructor = pieceConstructors[type]
        const p = new pieceConstructor(color, square)
        this.pieceList.push(p)
    }

    findPiece(square){
        const piece = this.pieceList.find((piece) => piece.getSquare() === square)
        return piece
    }
    findSquare(row, col){
        const square = this.squares.find((square) => square.getColumn() === col.toLowerCase() && square.getRow() == row)
        return square
    }

    findPieceByRowCol(row, col){
        const square = this.findSquare(row, col)
        const piece = this.findPiece(square)
        return piece
    }

    killPiece(piece){
        const newPieceList = this.pieceList.filter(p => p != piece)
        this.pieceList = newPieceList
    }

    print(){
        this.pieceList.forEach(piece => piece.print())
    }

    json(){
        const alphabet = "abcdefgh"
        return this.pieceList.map(piece => {return { //sostituisce numeri colonne con lettere
            "color": piece.color,
            "type": piece.type,
            "column": piece.getSquare().getColumn(),
            "row": piece.getSquare().getRow()
        }});
    }

    changeBoard(newPieceList){
        this.pieceList.forEach(piece => this.killPiece(piece)) //rimuove i pezzi attuali
        newPieceList.forEach(piece => {
            const pieceSquare = this.findSquare(piece.getSquare().getRow(), piece.getSquare().getColumn())
            this.addPiece(piece.getType(), piece.getColor(), pieceSquare)
        })
    }

    getPlayerColorUnderCheck(){
        let color = ''
        this.pieceList.forEach(piece => { //per ciascun pezzo
            const possibleMoves = piece.getPossibleMoves() //controlla dove può andare il pezzo
            possibleMoves.forEach(move => { //per ciascuna casella
                if(move.newSquare.getPiece()){ //se c'è un pezzo
                    piece = move.newSquare.getPiece()
                    if(piece.getType() === 'king'){ //se è un re
                        color = piece.getColor()
                    }
                }
            })
        })
        return color
    }

    getAttackedSquaresByColor(color){
        let attackedSquares = []
        this.pieceList.forEach(piece => { //per ciascun pezzo
            if(piece.getColor() === color){
                const possibleMoves = piece.getPossibleMoves(false) //controlla dove può andare il pezzo
                possibleMoves.forEach(move => attackedSquares.push(move.newSquare))
            }
        })
        return attackedSquares
    }

    getMate(){
        const color = this.getPlayerColorUnderCheck()
        if(!color){
            return null
        }
        let possibleMoves = []
        this.pieceList.forEach(piece => { //per ciascun pezzo
            if(piece.getColor() === color){
                const tmpMoves = piece.getPossibleMoves() //controlla dove può andare il pezzo
                const newTmpMoves = tmpMoves.filter(move => { //per ciascuna casella
                    const virtualBoard = new Board()
                    const oldSquare = piece.getSquare()
                    const oldRow = oldSquare.getRow()
                    const oldCol = oldSquare.getColumn()
                    const newRow = move.newSquare.getRow()
                    const newCol = move.newSquare.getColumn()
                    virtualBoard.changeBoard(this.getpieceList())
                    const virtualPiece = virtualBoard.findPieceByRowCol(oldRow, oldCol) //questo pezzo nella nuova scacchiera
                    const virtualNewSquare = virtualBoard.findSquare(newRow, newCol) //il pezzo a cui si deve spostare nella nuova scacchiera
                    virtualPiece.handleMove({'newSquare': virtualNewSquare}) //muove il pezzo nella nuova scacchiera (handleMove per non controllare gli scacchi prima di muovere)
                    const stillCheck = virtualBoard.getPlayerColorUnderCheck() === color //guarda se è ancora scacco dopo aver mosso
                    return !stillCheck //se non è scacco tiene la mossa
                })
                possibleMoves = possibleMoves.concat(newTmpMoves)
            }
        })
        if(possibleMoves.length === 0){
            console.log(`${color}, has no moves. Mate`)
            return color
        } else {
            return null
        }
    }
}