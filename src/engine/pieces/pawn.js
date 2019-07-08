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
        let color = -1;
        if(this.isWhite()){
            color = 1;
        }

        newRow += color;
        let oneSquare = Square.at(newRow, newCol);
        allowedSquares.push(oneSquare);

        if(initialSquare.row === color || initialSquare.row === color + 7){
            newRow += color;
            let twoSquare = Square.at(newRow, newCol);
            allowedSquares.push(twoSquare);
        }
        
        return allowedSquares;
    }
}
