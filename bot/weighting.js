/*
 * Importação dos objeitos usados
 */
var config = require('./config.js').config;


/*
 * Definição do objeito
 */
var self = exports.weighting = {
	winningWeighting : config.infinity, // A valor dum jogo ganhando
	losingWeighting : 0, // A valor dum jogo perdendo
	enPassantWeighting : 100000, // A valor dum movimento en passant
	/*
	 * A valor de cada peça de cada cor
	 */
	weightingsMap : {
		0 : {
			81 : 10000,
			82 : 1000,
			66 : 100,
			78 : 100,
			80 : 100000,
		},
		1 : {
			113 : 10000,
			114 : 1000,
			98 : 100,
			110 : 100,
			112 : 100000,
		},
	},
	/*
	 * Cálcula a valor do jogo, a valor esta winningWeighting
	 * se a cor (player), losingWeighting se a cor (player) perde,
	 * e a soma das valores das peças da cor (player) que ficam na
	 * tabela menus a soma das valores negativas das peças da cor do
	 * adversário da cor (player) que ficam na tabela.
	 */
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