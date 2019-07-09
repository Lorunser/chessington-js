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
        if(this.movesMade===0){
            const kingRow = board.findPiece(this).row;
            const cornerPositions = [0,7];
            const increment = [1,-1];
            for (let i in cornerPositions){
                const pieceChecking = board.getPiece(Square.at(kingRow,cornerPositions[i]));
                if(pieceChecking instanceof Rook && pieceChecking.movesMade===0){
                    let empty = true;
                    for (let j = cornerPositions[i]+increment[i];j!=3;j=j+increment[i]){
                        if(board.getPiece(Square.at(kingRow,j))!==undefined){
                            empty = false;
                        }
                    }
                    if (empty===true){
                        castlingMoves.push(Square.at(kingRow,cornerPositions[i]));
                    }
                }
            }
            
        }
    }
}
