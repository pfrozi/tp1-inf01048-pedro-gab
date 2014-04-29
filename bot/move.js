/**
 * 
 */


/*
 * Importação dos objeitos usados
 */
var config = require('./config.js').config;


/*
 * Definição do objeito
 */
var self = exports.rule = {
	possibleMovesMap : {
		0 : {
			113 : self.whiteQueenPossibleMoves,
			114 : self.whiteTowerPossibleMoves,
			98 : self.whiteBishopPossibleMoves,
			110 : self.whiteKnightPossibleMoves,
			112 : self.whitePawnPossibleMoves,
		},
		1 : {
			81 : self.blackQueenPossibleMoves,
			82 : self.blackTowerPossibleMoves,
			66 : self.blackBishopPossibleMoves,
			78 : self.blackKnightPossibleMoves,
			80 : self.blackPawnPossibleMoves,
		},
	},
	possibleMoves : function(board, player) {
		var possibleMoves = [];
		
		var boardIndexes = config.boardIndexes;
		for(var i in boardIndexes) {
			for(var j in boardIndexes[i]) {
				var playerPossibleMoves = self.possibleMovesMap[player];
				var piece = board[boardIndexes[i][j]];
				var piecePossibleMoves = playerPossibleMoves[piece];
				possibleMoves.push(piecePossibleMoves(board, [i, j]));
			}
		}
		
		return possibleMoves;
	},
	whiteQueenPossibleMoves : function(board, position) {
		var possibleMoves = [];

		/*
		 * Return the possible boards by moving the white queen
		 */
		
		return possibleMoves;
	},
	whiteTowerPossibleMoves : function(board, position) {
		var possibleMoves = [];
		
		/*
		 * Return the possible boards by moving the white tower
		 */
		
		return possibleMoves;
	},
	whiteBishopPossibleMoves : function(board, position) {
		var possibleMoves = [];
		
		/*
		 * Return the possible boards by moving the white bishop
		 */
		
		return possibleMoves;
	},
	whiteKnightPossibleMoves : function(board, position) {
		var possibleMoves = [];
		
		/*
		 * Return the possible boards by moving the white knight
		 */
		
		return possibleMoves;
	},
	whitePawnPossibleMoves : function(board, position) {
		var possibleMoves = [];
		
		/*
		 * Return the possible boards by moving the white pawn
		 */
		
		return possibleMoves;
	},
	blackQueenPossibleMoves : function(board, position) {
		var possibleMoves = [];

		/*
		 * Return the possible boards by moving the black queen
		 */
		
		return possibleMoves;
	},
	blackTowerPossibleMoves : function(board, position) {
		var possibleMoves = [];
		
		/*
		 * Return the possible boards by moving the black tower
		 */
		
		return possibleMoves;
	},
	blackBishopPossibleMoves : function(board, position) {
		var possibleMoves = [];
		
		/*
		 * Return the possible boards by moving the black bishop
		 */
		
		return possibleMoves;
	},
	blackKnightPossibleMoves : function(board, position) {
		var possibleMoves = [];
		
		/*
		 * Return the possible boards by moving the black knight
		 */
		
		return possibleMoves;
	},
	blackPawnPossibleMoves : function(board, position) {
		var possibleMoves = [];
		
		/*
		 * Return the possible boards by moving the black pawn
		 */
		
		return possibleMoves;
	},
};