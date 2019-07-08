import Piece from './piece';
import Square from '../square';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let initialSquare = board.findPiece(this);
        let newRow = initialSquare.row
        let newCol = initialSquare.col;

        let allowedSquares = [];
        
        //get color
        let color = this.isWhite() ? 1: -1;

        newRow += color;
        let oneSquare = Square.at(newRow, newCol);
        allowedSquares.push(oneSquare);

        //check for in initial position
        if(this.isInInitialPosition(initialSquare)){
            newRow += color;
            let twoSquare = Square.at(newRow, newCol);
            allowedSquares.push(twoSquare);
        }
        
        return allowedSquares;
    }

    isInInitialPosition(square){
        if(this.isWhite() && square.row === 1){
            return true;
        }
        if(this.isWhite() === false && square.row === 6){
            return true
        }
        return false;
    }
}
