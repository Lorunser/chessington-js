import Piece from './piece';
import Square from '../square';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let initialSquare = board.findPiece(this);
        let allowedSquares = [];
        let rowInc = this.isWhite() ? 1: -1;

        const limiter = this.isInInitialPosition(initialSquare)? 2:1;
        let forwardMoves = this.generateLineMoves(board,rowInc,0,limiter);
        forwardMoves = forwardMoves.filter((square) => square.isEnemy(this, board) === false);
        allowedSquares = allowedSquares.concat(forwardMoves);

        let diagonals = [-1,1];

        for(let colInc of diagonals){
            let diagonalMoves = this.generateLineMoves(board,rowInc,colInc,1);
            diagonalMoves = diagonalMoves.filter((square)=> square.isEnemy(this, board));
            allowedSquares = allowedSquares.concat(diagonalMoves);
        }
        
        return allowedSquares;
    }

    isInInitialPosition(square){
        return ((this.isWhite() && square.row === 1)||(!this.isWhite() && square.row === 6));
    }
}