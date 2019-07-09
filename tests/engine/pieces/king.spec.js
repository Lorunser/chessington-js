import 'chai/register-should';
import King from '../../../src/engine/pieces/king';
import Pawn from '../../../src/engine/pieces/pawn';
import Rook from '../../../src/engine/pieces/rook';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';

describe('King', () => {

    let board;
    beforeEach(() => board = new Board());

    it('can move to adjacent squares', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [
            Square.at(2, 3), Square.at(2, 4), Square.at(2, 5), Square.at(3, 5),
            Square.at(4, 5), Square.at(4, 4), Square.at(4, 3), Square.at(3, 3)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        moves.should.have.length(8);
    });

    it('cannot leave the board', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(0, 0), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [Square.at(0, 1), Square.at(1, 1), Square.at(1, 0)];

        moves.should.deep.have.members(expectedMoves);
    });

    it('can take opposing pieces', () => {
        const king = new King(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.deep.include(Square.at(5, 5));
    });

    it('cannot take the opposing king', () => {
        const king = new King(Player.WHITE);
        const opposingKing = new King(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingKing);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(5, 5));
    });

    it('cannot take friendly pieces', () => {
        const king = new King(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), friendlyPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(5, 5));
    });

    it('has the option of castling', () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);
        board.setPiece(Square.at(0,3), king);
        board.setPiece(Square.at(0,7), rook);

        const moves = king.getAvailableMoves(board);

        moves.should.have.length(6);
    });

    it('cannot castle when obstructed', () => {
        const king = new King(Player.BLACK);
        const rook = new Rook(Player.BLACK);
        board.setPiece(Square.at(7,4), king);
        board.setPiece(Square.at(7,7), rook);

        let moves = king.getAvailableMoves(board);
        moves.should.have.length(6); //5 normal + 1 castle

        const obstructingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(7,6), obstructingPiece);

        moves = king.getAvailableMoves(board);
        moves.should.have.length(5); //5 normal
    });

    it('castling moves the rook as well', () =>{
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);
        board.setPiece(Square.at(0,3), king);
        board.setPiece(Square.at(0,0), rook);

        king.moveTo(board, Square.at(0,1));

        const rookSquare = board.findPiece(rook);
        rookSquare.should.deep.equal(Square.at(0,2)); //equals method overriden >> ==
    });

    it('cannot castle if either piece has moved', () =>{
        const king = new King(Player.WHITE);
        const rook_left = new Rook(Player.WHITE);
        const rook_right = new Rook(Player.WHITE);

        board.setPiece(Square.at(0,3), king);
        board.setPiece(Square.at(0,0), rook_left);
        board.setPiece(Square.at(0,7), rook_right);

        let moves = king.getAvailableMoves(board);
        moves.should.have.length(7); //5 normal + 2 castlings

        rook_left.moveTo(board, Square.at(0,1));

        moves = king.getAvailableMoves(board);
        moves.should.have.length(6); //5 normal + 1 castling

        king.moveTo(board, Square.at(0,4));

        moves = king.getAvailableMoves(board);
        moves.should.have.length(5); //5 normal
    });
});
