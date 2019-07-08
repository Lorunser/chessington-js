import Piece from './piece';
import Square from '../square';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let initialSquare = board.findPiece(this);
        let newRow = initialSquare.row
        let newColumn = initialSquare.col;

        if(this.isWhite()){
            newRow += 1;
        }
        else{
            newRow -= 1;
        }
        
        return Square.at(newRow, newColumn)
    }
}
