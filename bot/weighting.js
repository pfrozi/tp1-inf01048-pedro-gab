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
	winningWeighting : config.ininity,
	losingWeighting : 0,
	enPassantWeighting : 10,
	emptyWeighting : 500000,
	weightingsMap : {
		0 : {
			81 : 100000,
			82 : 100,
			66 : 1000,
			78 : 10000,
			80 : 10,
		},
		1 : {
			113 : 100000,
			114 : 100,
			98 : 1000,
			110 : 10000,
			112 : 10,
		},
	},
	evaluate : function(boardFrom, boardTo, player, position) {
		var row = position[0];
		var col = position[1];
		var piece = boardTo[config.boardIndexes[row][col]];
		var lastRow = config.lastRowMap[player];
		var enemyLastRow = config.lastRowMap[player^1];

		if(piece == config.pawnsCodeMap[player] && row == lastRow) {
			return self.winningWeighting;
		} else if(piece == config.pawnsCodeMap[player^1] && row == enemyLastRow) {
			return self.losingWeighting;
		}
		
		var oldPiece = boardFrom[config.boardIndexes[row][col]];
		if(config.piecesCodeMap[player^1].indexOf(oldPiece)) {
			var weighting = self.weightingsMap[player][oldPiece];
			if(weighting) {
				return weighting * 100000;
			}
		} else if(config.piecesCodeMap[player].indexOf(oldPiece)) {
			var weighting = self.weightingsMap[player^1][oldPiece];
			if(weighting) {
				return weighting;
			}
		} else {
			if(oldPiece == config.enPassantCode) {
				if(config.piecesCodeMap[player].indexOf(piece)) {
					return self.enPassantWeighting * 100000;
				} else if(config.piecesCodeMap[player^1].indexOf(piece)) {
					return self.enPassantWeighting;
				}
			} else if(oldPiece == config.emptySquareCode) {
				return self.emptyWeighting;
			}
		}
	},
};