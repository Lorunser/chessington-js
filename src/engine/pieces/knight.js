import Piece from './piece';

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let allowedSquares = [];
        let increments = [-2,-1,2,1];
        for (let i of increments){
            for(let j of increments){
                if(Math.abs(i) != Math.abs(j)){
                    allowedSquares = allowedSquares.concat(this.generateLineMoves(board,i,j,1));
                }   
            }
        }
        return allowedSquares;
    }
}
