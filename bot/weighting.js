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
var self = exports.weighting = {
	winningWeighting : config.infinity,
	losingWeighting : 0,
	enPassantWeighting : 10,
	emptyWeighting : 500000,
	weightingsMap : {
		0 : {
			81 : 100000,
			82 : 10000,
			66 : 1000,
			78 : 10000,
			80 : 100,
		},
		1 : {
			113 : 100000,
			114 : 10000,
			98 : 1000,
			110 : 10000,
			112 : 100,
		},
	},
	evaluate : function(board, player) {
		var boardIndexes = config.boardIndexes;
		var lastRow = config.lastRowMap[player];
		var lastRowIndexes = boardIndexes[lastRow];
		for(var i in lastRowIndexes) {
			var piece = board[lastRowIndexes[i]];
			if(piece == config.pawnsCodeMap[player]) {
				return self.winningWeighting;
			}
		}
		
		var enemyLastRow = config.lastRowMap[player^1];
		var enemyLastRowIndexes = boardIndexes[enemyLastRow];
		for(var i in enemyLastRowIndexes) {
			var enemyPiece = board[enemyLastRowIndexes[i]];
			if(enemyPiece == config.pawnsCodeMap[player^1]) {
				return self.losingWeighting;
			}
		}
        
        
		
		var weighting = self.winningWeighting / 2;
		for(var i in boardIndexes) {
			for(var j in boardIndexes) {
				var piece = board[boardIndexes[i][j]];
				if(config.piecesCodeMap[player].indexOf(piece) >= 0) {
					weighting += self.weightingsMap[player][piece];
				} else if(config.piecesCodeMap[player^1].indexOf(piece) >= 0) {
					weighting -= self.weightingsMap[player^1][piece];
				}
			}
		}
		return weighting;
	},
};