import Piece from './piece';
import Square from '../square';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let initialSquare = board.findPiece(this);
        let newRow, newColumn;
        newColumn = initialSquare.col;

        if(this.isWhite()){
            newRow = initialSquare.row + 1;
        }
        else{
            newRow = initialSquare.row - 1;
        }
        

        return Square.at(newRow, newColumn)
    }
}
