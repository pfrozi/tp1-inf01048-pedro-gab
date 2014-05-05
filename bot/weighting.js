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
	evaluate : function(board) {
		/*if(self.isWinning(board)) {
			return self.winningWeighting;
		} else if (self.isLosing(board)) {
			return self.losingWeighting;
		}
		return comparePlayersPosition(board);*/
		return Math.round(Math.random() * 10000);
	},
	isWinning : function(board) {
		var boardIndexes = config.boardIndexes;
		var lastRowIndexes = boardIndexes[config.lastRowMap[self.player]];
		
		for(var i in lastRowIndexes) {
			var piece = lastRowIndexes[i];
			if(config.piecesCodeMap[player].indexOf(piece) >= 0) {
				return true;
			} 
		}
		
		var hasEnemyPawns = false;
		for(var i in boardIndexes) {
			var piece = boardIndexes[i];
			if(piece == config.pawnsCodeMap[player^1]) {
				hasEnemyPawns = true;
				break;
			}
		}
		return !hasEnemyPawns;
	},
	isLosing : function(board) {
		var boardIndexes = config.boardIndexes;
		var firstRowIndexes = boardIndexes[config.lastRowMap[self.player^1]];
		
		for(var i in firstRowIndexes) {
			var piece = firstRowIndexes[i];
			if(config.piecesCodeMap[player^1].indexOf(piece) >= 0) {
				return true;
			} 
		}
		
		var hasPawns = false;
		for(var i in boardIndexes) {
			var piece = boardIndexes[i];
			if(piece == config.pawnsCodeMap[player]) {
				hasPawns = true;
				break;
			}
		}
		return !hasPawns;
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