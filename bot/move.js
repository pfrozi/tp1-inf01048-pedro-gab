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
var self = exports.move = {
	possibleDirectionsMap : {
		0 : {
			81 : [[-1,-1],[1,1],[-1,1],[1,-1],[0,1],[0,-1],[1,0],[-1,0]],
			82 : [[0,1],[1,0],[0,-1],[-1,0]],
			66 : [[-1,-1],[1,1],[-1,1],[1,-1]],
			78 : [[2,-1],[2,1],[1,2],[-1,2],[-2,1],[-2,-1],[1,-2],[-1,-2]],
			80 : [[1,-1],[1,1],[1,0],[2,0]],
		},
		1 : {
			113 : [[-1,-1],[1,1],[-1,1],[1,-1],[0,1],[0,-1],[1,0],[-1,0]],
			114 : [[0,1],[1,0],[0,-1],[-1,0]],
			98 : [[-1,-1],[1,1],[-1,1],[1,-1]],
			110 : [[2,-1],[2,1],[1,2],[-1,2],[-2,1],[-2,-1],[1,-2],[-1,-2]],
			112 : [[-1,1],[-1,-1],[-1,0],[-2,0]],
		},
	},
	nextMovesMap : {
		0 : {
			81 : function(board, player, position, direction) { 
	            	return self.queenNextMoves(board, player, position, direction); },
			82 : function(board, player, position, direction) { 
	            	return self.towerNextMoves(board, player, position, direction); },
			66 : function(board, player, position, direction) { 
	            	return self.bishopNextMoves(board, player, position, direction); },
			78 : function(board, player, position, direction) { 
	            	return self.knightNextMoves(board, player, position, direction); },
			80 : function(board, player, position, direction) { 
	            	return self.pawnNextMoves(board, player, position, direction); },
		},
	    1 : {
			113 : function(board, player, position, direction) { 
					return self.queenNextMoves(board, player, position, direction); },
			114 : function(board, player, position, direction) { 
					return self.towerNextMoves(board, player, position, direction); },
			98 : function(board, player, position, direction) { 
					return self.bishopNextMoves(board, player, position, direction); },
			110 : function(board, player, position, direction) { 
					return self.knightNextMoves(board, player, position, direction); },
			112 : function(board, player, position, direction) { 
					return self.pawnNextMoves(board, player, position, direction); },
		},
	},
	possibleMoves : function(board, player) {
		var possibleMoves = [];
		
		var boardIndexes = config.boardIndexes;
		for(var i = 0; i < boardIndexes.length; i++) {
			for(var j = 0; j < boardIndexes[i].length; j++) {
				var piecePossibleMoves = self.piecePossibleMoves(board, player, [i, j]);
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
		var pieceNextMovesFunction = self.nextMovesMap[player][piece];
		
		if(pieceNextMovesFunction) {
			for(var i in possibleDirections) {
				var direction = possibleDirections[i];
				var pieceNextMoves = pieceNextMovesFunction(board, player, position, direction);
				possibleMoves = possibleMoves.concat(pieceNextMoves);
			}
		}
		
		return possibleMoves;
	},
	pieceNextMoves : function(board, player, position, direction) {
		var nextMoves = [];
		var row = position[0];
		var nextRow = row + direction[0];
		var nextRowIndexes = config.boardIndexes[nextRow];
		
		if(nextRowIndexes) {
			var col = position[1];
			var nextCol = col + direction[1];
			var nextIndex = nextRowIndexes[nextCol];
			if(nextIndex) {
				var nextSquare = board[nextIndex];
				var piecesCode = config.piecesCodeMap[player];
				
				if(piecesCode.indexOf(nextSquare) < 0) {
					var index = config.boardIndexes[row][col];
					var nextBoard = new Buffer(config.boardIndexes.length);
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
	knightNextMoves : function(board, player, position, direction) {
		var nextMoves = [];
		var row = position[0];
		var nextRow = row + direction[0];
		var nextRowIndexes = config.boardIndexes[nextRow];
		
		if(nextRowIndexes) {
			var col = position[1];
			var nextCol = col + direction[1];
			var nextIndex = nextRowIndexes[nextCol];
			if(nextIndex) {
				var nextSquare = board[nextIndex];
				var piecesCode = config.piecesCodeMap[player];
				
				if(piecesCode.indexOf(nextSquare) < 0) {
					var index = config.boardIndexes[row][col];
					var nextBoard = new Buffer(config.boardIndexes.length);
					board.copy(nextBoard);
					
					nextBoard[nextIndex] = board[index];
					nextBoard[index] = config.emptySquareCode;
					nextMoves.push(nextBoard);
				}
			}
		}
		
		return nextMoves;
	},
	pawnNextMoves : function(board, player, position, direction) {
		var nextMoves = [];
		var row = position[0];
		var nextRow = row + direction[0];
		var nextRowIndexes = config.boardIndexes[nextRow];
		
		if(nextRowIndexes) {
			var col = position[1];
			var nextCol = col + direction[1];
			var nextIndex = nextRowIndexes[nextRow][nextCol];
			if(nextIndex) {
				var nextSquare = board[nextIndex];
				var piecesCode = config.piecesCodeMap[player];
				
				if(piecesCode.indexOf(nextSquare) < 0) {
					var enemyPiecesCode = config.piecesCodeMap[player^1];
					var moveIsPossible;
					if(direction[1] == 0) {
						moveIsPossible = enemyPiecesCode.indexOf(nextSquare) < 0;
						if(direction[0] % 2 == 0) {
							var betweenRow = row + direction[0]/Math.abs(direction[0]);
							var betweenIndex = config.boardIndexes[betweenRow][nextCol];
							var betweenSquare = board[betweenIndex];
							moveIsPossible = moveIsPossible && (row == 1 || row == 6);
							moveIsPossible = moveIsPossible && betweenSquare == config.emptySquareCode;
						}
					} else {
						moveIsPossible = nextSquare == config.enPassantCode;
						moveIsPossible = moveIsPossible || nextSquare != config.emptySquareCode;
					}
					
					if(moveIsPossible) {
						var index = config.boardIndexes[row][col];
						var nextBoard = new Buffer(config.boardIndexes.length);
						board.copy(nextBoard);
						
						nextBoard[nextIndex] = board[index];
						nextBoard[index] = config.emptySquareCode;
						nextMoves.push(nextBoard);
					}
				}
			}
		}
		
		return nextMoves;
	},
};