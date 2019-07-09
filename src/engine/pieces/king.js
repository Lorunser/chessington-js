import Piece from './piece';
import Rook from './rook';
import Square from '../square';

export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let allowedSquares = [];
        let increments = [-1,0,1];
        for (let i of increments){
            for(let j of increments){
                allowedSquares = allowedSquares.concat(this.generateLineMoves(board,i,j,1));
            }
        }
        allowedSquares = allowedSquares.concat(this.castlingMoves(board));
        return allowedSquares;
    }

    castlingMoves(board){
        const castlingMoves = []

        if(this.movesMade > 0){
            return [];
        }

        const kingRow = board.findPiece(this).row;
        const cornerPositions = [0,7];

        for (let i of cornerPositions){
            let rookSquare = Square.at(kingRow, i);
            let rook = board.getPiece(rookSquare);

            if(rook instanceof Rook && rook.movesMade === 0){

                if(this.checkUnobstructed(rookSquare, board)){
                    let castlingCol = (i < 3)? i+1 : i-1;
                    let castlingSquare = Square.at(kingRow, castlingCol)
                    castlingMoves.push(castlingSquare);
                }
            }
        }

        return castlingMoves;
    }

    checkUnobstructed(rookSquare, board){
        let kingSquare = board.findPiece(this);

        //rows
        let row = kingSquare.row;
        if(row !== rookSquare.row){
            return false; // if not on same row
        }

        //columns
        let colArray = [kingSquare.col, rookSquare.col];
        colArray.sort();

        let lowerCol = colArray[0];
        let upperCol = colArray[1];

        //check no obstruction
        for(let i = lowerCol + 1; i < upperCol; i++){
            let square = Square.at(row, i);
            let piece = board.getPiece(square);

            if(piece !== undefined){
                return false;
            }
        }

        return true;
    }

    moveTo(board, newSquare){
        let currentSquare = board.findPiece(this);
        let colDistance = currentSquare.col - newSquare.col;
        let rookOnLeft = currentSquare.col > newSquare.col;
        let row = newSquare.row;

        //castling also move rook
        if(Math.abs(colDistance) > 1){
            const rookCol = (rookOnLeft)? 0 : 7; 
            const rookSquare = Square.at(row, rookCol);
            const rook = board.getPiece(rookSquare);

            const rookNewCol = (rookOnLeft)? 2 : 5;
            const rookNewSquare = Square.at(row, rookNewCol);
            rook.moveTo(board, rookNewSquare);
        }

        super.moveTo(board, newSquare)
    }
}
