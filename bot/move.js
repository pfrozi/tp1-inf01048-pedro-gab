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
	possibleDirectionsMap : {
		0 : {
			113 : [[-1,-1],[1,1],[-1,1],[1,-1],[0,1],[0,-1],[1,0],[-1,0]],
			114 : [[0,1],[1,0],[0,-1],[-1,0]],
			98 : [[-1,-1],[1,1],[-1,1],[1,-1]],
			110 : [[2,-1],[2,1],[1,2],[-1,2]],
			112 : [[1,-1],[1,1],[1,0],[2,0]],
		},
		1 : {
			81 : [[-1,-1],[1,1],[-1,1],[1,-1],[0,1],[0,-1],[1,0],[-1,0]],
			82 : [[0,1],[1,0],[0,-1],[-1,0]],
			66 : [[-1,-1],[1,1],[-1,1],[1,-1]],
			78 : [[2,-1],[2,1],[1,2],[-1,2]],
			80 : [[-1,1],[-1,-1],[-1,0],[-2,0]],
		},
	},
	nextMovesMap : {
		0 : {
			113 : self.queenNextMoves,
			114 : self.towerNextMoves,
			98 : self.bishopNextMoves,
			110 : self.knightNextMoves,
			112 : self.pawnNextMoves,
		},
		1 : {
			81 : self.queenNextMoves,
			82 : self.towerNextMoves,
			66 : self.bishopNextMoves,
			78 : self.knightNextMoves,
			80 : self.pawnNextMoves,
		},
	},
	possibleMoves : function(board, player) {
		var possibleMoves = [];
		
		var boardIndexes = config.boardIndexes;
		for(var i in boardIndexes) {
			for(var j in boardIndexes[i]) {
				var piecePossibleMoves = piecePossibleMoves(board, player, [i, j]);
				possibleMoves = possibleMoves.concat(piecePossibleMoves);
			}
		}
		
		return possibleMoves;
	},
	piecePossibleMoves : function(board, player, position) {
		var possibleMoves = [];
		var pieceIndex = config.boardIndexes[position[0]][position[1]];
		var piece = board[pieceIndex];
		var possibleDirections = self.possibleDirectionsMap[player][piece];
		var pieceNextMoves = self.nextMovesMap[player][piece];
		
		if(pieceNextMoves) {
			for(var i in possibleDirections) {
				var direction = possibleDirections[i];
				pieceNextMoves = pieceNextMoves(board, player, position, direction);
				possibleMoves = possibleMoves.concat(pieceNextMoves);
			}
		}
		
		return possibleMoves;
	},
	pieceNextMoves : function(board, player, position, direction) {
		var nextMoves = [];
		var row = position[0];
		var col = position[1];
		var nextRow = row + direction[0];
		var nextCol = col + direction[1];
		var nextIndex = config.boardIndexes[nextRow][nextCol];
		
		if(nextIndex) {
			var nextSquare = board[nextIndex];
			var piecesCode = config.piecesCodeMap[player];
			
			if(piecesCode.indexOf(nextSquare) < 0) {
				var index = config.boardIndexes[row][col];
				var nextBoard = new Buffer();
				board.copy(nextBoard);
				
				nextBoard[nextIndex] = board[index];
				nextBoard[index] = config.emptySquareCode;
				nextMoves.push(nextBoard);
				
				var enemyPiecesCode = config.piecesCodeMap[player^1];
				if(enemyPiecesCode.indexOf(nextSquare) < 0) {
					var nextPosition = [nextRow, nextCol];
					var pieceNextMoves = self.pieceNextMoves(nextBoard, player, nextPosition, direction);
					nextMoves = nextMoves.concat(pieceNextMoves);
				}
			}
		}
		
		return nextMoves;
	},
	queenNextMoves : function(board, player, position, direction) {
		return self.pieceNextMoves(board, player, position, direction);
	},
	towerNextMoves : function(board, player, position, direction) {
		return self.pieceNextMoves(board, player, position, direction);
	},
	bishopNextMoves : function(board, player, position, direction) {
		return self.pieceNextMoves(board, player, position, direction);
	},
	knighNextMoves : function(board, player, position, direction) {
		var nextMoves = [];
		var row = position[0];
		var col = position[1];
		var nextRow = row + direction[0];
		var nextCol = col + direction[1];
		var nextIndex = config.boardIndexes[nextRow][nextCol];
		
		if(nextIndex) {
			var nextSquare = board[nextIndex];
			var piecesCode = config.piecesCodeMap[player];
			
			if(piecesCode.indexOf(nextSquare) < 0) {
				var nextBoard = new Buffer();
				board.copy(nextBoard);
				
				nextBoard[nextIndex] = board[index];
				nextBoard[index] = config.emptySquareCode;
				nextMoves.push(nextBoard);
			}
		}
		
		return nextMoves;
	},
	pawnNextMoves : function(board, player, position, direction) {
		var nextMoves = [];
		var row = position[0];
		var col = position[1];
		var nextRow = row + direction[0];
		var nextCol = col + direction[1];
		var nextIndex = config.boardIndexes[nextRow][nextCol];
		
		if(nextIndex) {
			var nextSquare = board[nextIndex];
			var piecesCode = config.piecesCodeMap[player];
			
			if(piecesCode.indexOf(nextSquare) < 0) {
				/*
				 * Para completar
				 */
				
				var nextBoard = new Buffer();
				board.copy(nextBoard);
				
				nextBoard[nextIndex] = board[index];
				nextBoard[index] = config.emptySquareCode;
				nextMoves.push(nextBoard);
			}
		}
		
		return nextMoves;
	},
};