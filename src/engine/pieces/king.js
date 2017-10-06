import Piece from './piece';

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
        return allowedSquares;
    }
}
