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
        if(oneSquare.isValid(this,board)){
            if (board.getPiece(oneSquare)===undefined){         
                allowedSquares.push(oneSquare);
                if(this.isInInitialPosition(initialSquare)){
                    newRow += color;
                    let twoSquare = Square.at(newRow, newCol);
                    if (board.getPiece(twoSquare)===undefined){
                        allowedSquares.push(twoSquare);
                    }
                }
            }
        }

        let sides = [-1,1];

        for(let colInc of sides){
            const sideMoves = this.generateLineMoves(board,color,colInc,1);
            for(let move of sideMoves){
                if(move.isEnemy(this,board)){
                    allowedSquares.push(move);
                }   
            }
        }
        
        return allowedSquares;
    }

    isInInitialPosition(square){
        return ((this.isWhite() && square.row === 1)||(!this.isWhite() && square.row === 6));
    }
}
