import Player from '../player';
import Square from '../square';

export default class Piece {
    constructor(player) {
        this.player = player;
    }

    getAvailableMoves(board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);

    }

    generateLineMoves(board, rowInc,colInc, limiter=8){
        if(rowInc==0 && colInc==0){
            return [];
        }
        
        const currentSquare = board.findPiece(this);
        const possMoves = [];
        let newRow = currentSquare.row;
        let newCol = currentSquare.col;
        let count = 0;

        while(count<limiter){
            newRow += rowInc;
            newCol += colInc;
            let possSquare = Square.at(newRow,newCol);
            if(possSquare.isValid(this,board)){
                count = possMoves.push(possSquare);

                if(possSquare.isEnemy(this, board)){
                    count = limiter;
                }
            }
            else{
                count = limiter;
            }
        }
        return possMoves;
    }

    isWhite(){
        return this.player === Player.WHITE;
    }
}