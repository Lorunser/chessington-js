import Piece from './piece';
import Square from '../square';

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let allowedSquares = [];
        let increments = [-1,1];
        for (let i of increments){
            for(let j of increments){
                allowedSquares = allowedSquares.concat(this.generateLineMoves(board,i,j));
            }
        }
        return allowedSquares;
    }
}
