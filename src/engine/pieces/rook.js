import Piece from './piece';
import Square from '../square';

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let initial = board.findPiece(this);
        let allowedSquares = [];

        for(let i = 0; i < 8; i++){
            let verticalSquare = Square.at(i, initial.col);
            let horizontalSquare = Square.at(initial.row, i);

            if(!verticalSquare.equals(initial)){
                allowedSquares.push(verticalSquare);
            }
            
            if(!horizontalSquare.equals(initial)){
                allowedSquares.push(horizontalSquare);
            }
        }

        return allowedSquares;
    }
}
