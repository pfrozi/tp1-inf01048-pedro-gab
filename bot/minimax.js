/**
 * 
 */


/*
 * Importação dos objeitos usados
 */
var config = require('./config.js').config;
var move = require('./move.js').move;


/*
 * Definição do objeito
 */
var self = exports.minimax = {
	time : null,
	maxPlayer : null,
	minPlayer : null,
    boardFrom: null,
    boardTo: null,
	init : function(maxPlayer, minPlayer) {
		self.maxPlayer = maxPlayer;
		self.minPlayer = minPlayer;
	},
	analyseBoard : function(board, callback) {
		self.time = new Date().getTime();
		self.alphaBetaSearch(board, callback);
	},
	alphaBetaSearch : function(board, callback) {
		
        self.boardFrom = board;
        var value = self.maxValue(board, -config.infinity, config.infinity, 0);
        
        // console.log('Value of best decision');
        // console.log(value);
        var position = self.extractCoord(self.boardFrom, self.boardTo);
        
		callback(position[0], position[1]);
	},
	maxValue : function(board, alpha, beta, depth) {
		
        if(self.timeIsOut() || depth > config.depthMax) {
			return board.value;
		}
        var nextBoards = move.possibleMoves(board, self.maxPlayer);
		if(!nextBoards) {
			return board.value;
		}
        
		var value = -config.infinity;
		for(var i in nextBoards) {
            var decision = value; 
			value = Math.max(value, self.minValue(nextBoards[i], alpha, beta, depth + 1));
            
            if(depth == 0){
                if(value > decision){
                    self.boardTo = nextBoards[i];
                }
            }
        }
		if(value >= beta) {
			return value;
		}
		alpha = Math.max(alpha, value);
		return value;
	},
	minValue : function(board, alpha, beta, depth) {
		
        if(self.timeIsOut() || depth > config.depthMax) {
			return board.value;
		}
        var nextBoards = move.possibleMoves(board, self.minPlayer);
		if(!nextBoards) {
			return board.value;
		}
		var value = config.infinity;
		for(var i in nextBoards) {
            value = Math.min(value, self.maxValue(nextBoards[i], alpha, beta, depth + 1));
        }
		if(value <= alpha) {
			return value;
		}
		beta = Math.min(beta, value);
		return value;
	},
    extractCoord : function(board1, board2) {
        var coordFrom = null;
        var coordTo = null;
        
        var rowMax = self.boardHeight;
        var colMax = self.boardWidth;
        var boardIdx = self.boardIndexes;
        
        ext:
        for(var i = 0; i < rowMax; i++) {
            for(var j = 0; j < colMax; j++) {
                if(board1[boardIdx[i][j]] != board2[boardIdx[i][j]]) {
                    if(board2[boardIdx[i][j]] == self.emptySquareCode) {
                        coordFrom = [i, j];
                    }
                    else {
                        coordTo = [i, j];
                    }
                }
                
                if(coordFrom && coordTo) {
                    break ext;
                }
            }
        }
        
        // console.log(board1);
        // console.log(board2);
        
        // console.log(coordFrom);
        // console.log(coordTo);
        
        return [coordFrom, coordTo];
    },
	timeIsOut : function() {
		return new Date().getTime() - self.time >= config.searchTimeOut;
	},
};