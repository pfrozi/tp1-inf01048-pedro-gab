/**
 * 
 */


/*
 * Importação dos objeitos usados
 */
var config = require('./config.js').config;
var move = require('./move.js').move;
var weighting = require('./weighting.js').weighting;


/*
 * Definição do objeito
 */
var self = exports.minimax = {
	time : null,
	maxPlayer : null,
	minPlayer : null,
	init : function(maxPlayer, minPlayer) {
		self.maxPlayer = maxPlayer;
		self.minPlayer = minPlayer;
	},
	analyseBoard : function(board, callback) {
		self.time = new Date().getTime();
		self.alphaBetaSearch(board, callback);
	},
	alphaBetaSearch : function(board, callback) {
		var value = maxValue(board, -config.ininity, config.ininity);
		/*
		 * To send the best move
		 */
		callback(/* from, to (Best move) */);
	},
	maxValue : function(board, alpha, beta) {
		var nextBoards = move.possibleMoves(board, self.maxPlayer);
		if(self.timeIsOut() || !nextBoards) {
			return weighting.evaluate(board);
		}
		var value = -config.ininity;
		for(var i in nextBoards) {
			value = Math.max(value, minValue(nextBoards[i], alpha, beta));
		}
		if(value >= beta) {
			return value;
		}
		alpha = Math.max(alpha, value);
		return value;
	},
	minValue : function(board, alpha, beta) {
		var nextBoards = move.possibleMoves(board, self.minPlayer);
		if(self.timeIsOut() || !nextBoards) {
			return weighting.evaluate(board);
		}
		var value = config.ininity;
		for(var i in nextBoards) {
			value = Math.min(value, maxValue(nextBoards[i], alpha, beta));
		}
		if(value <= alpha) {
			return value;
		}
		beta = Math.min(beta, value);
		return value;
	},
	timeIsOut : function() {
		return new Date().getTime() - self.time >= config.searchTimeOut;
	},
};