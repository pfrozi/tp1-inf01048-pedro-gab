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
		
		var oldPiece = boardTo[config.boardIndexes[row][col]];
		
	},
	comparePlayersPosition : function(board) {
		var boardIndexes = config.boardIndexes;
		var weighting = self.winningWeighting / 2;
		
		for(var i in boardIndexes) {
			for(var j in boardIndexes[i]) {
				var piece = board[boardIndexes[i][j]];
				var goodCaseWeighting = self.weightingsMap[self.player][piece];
				var badCaseWeighting = self.weightingsMap[self.player^1][piece];
				if(goodCaseWeighting) {
					weighting += goodCaseWeighting * 10000000;
				} else if(badCaseWeighting) {
					weighting += badCaseWeighting;
				}
			}
		}
		
		return weighting;
	},
};