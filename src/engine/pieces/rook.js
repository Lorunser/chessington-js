import Piece from './piece';
import Square from '../square';

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let allowedSquares = [];
        let increments = [-1,0,1];

        for (let i of increments){
            for(let j of increments){
                if(Math.abs(i) !== Math.abs(j)){
                    allowedSquares = allowedSquares.concat(this.generateLineMoves(board,i,j));
                }
            }
        }

        return allowedSquares;
    }
}
