import King from './pieces/king';

export default class Square {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    static at(row, col) {
        return new Square(row, col);
    }

    equals(otherSquare) {
        return !!otherSquare && this.row === otherSquare.row && this.col === otherSquare.col;
    }

    toString() {
        return `Row ${this.row}, Col ${this.col}`;
    }

    isValid(movingPiece, board){
        if(this.row<0||this.col<0||this.row>7||this.col>7){
            return false;
        }
        else{
            let occupiedPiece = board.getPiece(this);
            if(occupiedPiece instanceof King){
                return false;
            }
            //can move into empty or enemy
            if(occupiedPiece === undefined || occupiedPiece.player !== movingPiece.player){
                return true;
            }

            return false;
        }
    }

    isEnemy(movingPiece, board){
        let occupiedPiece = board.getPiece(this);

        if(occupiedPiece === undefined || occupiedPiece.player === movingPiece.player){
            return false;
        }
        return true;
    }
}
