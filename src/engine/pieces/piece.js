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

    generateMoves(board, rowInc,colInc, limiter=8){
        const currentSquare = board.findPiece(this);
        const possMoves = [];
        let valid =true;
        let newRow = currentSquare.row;
        let newCol = currentSquare.col;
        let count = 0;

        while(valid && count<limiter){
            newRow += rowInc;
            newCol += colInc;
            count++;
            let possSquare = Square.at(newRow,newCol);   
            if(possSquare.isValid()){
                possMoves.push(possSquare);
            }
            else{
                valid=false;
            }
        }

    }

    isWhite(){
        return this.player === Player.WHITE;
    }
}
