/**
 * 
 */

var logsEnabled = true;


/*
 * Importação dos objeitos usados
 */
var config = require('./config.js').config;
var connection = require('./connection.js').connection;
var minimax = require('./minimax.js').minimax;


/*
 * Definição do objeito
 */
var self = exports.bot = {
	color : config.white,
	init : function(options) {		
		var optionsLength = options.length;
		
        /*
		var host = optionsLength == 3 ? options[2] : 'localhost';
		var port = config.whitePort;
		if(optionsLength == 4 && options[3] == 'black') {
			self.color = config.black;
			port = config.blackPort;
		}
		*/
        var host = config.host;
		var port = config.whitePort;
        
        if(config.botType == 'black') {
            self.color = config.black;
			port = config.blackPort;
        }
        
		minimax.init(self.color,self.color^1);
		
        if(logsEnabled){
            console.log('Connection Details');
            console.log('- Port: ' + port);
            console.log('- Host: '+ host);
            console.log('- Name: '+ config.botName);
        }
		connection.init(port, host, self.sendName);
		connection.listen(self.play);
	},
	sendName : function() {
		connection.send(JSON.stringify({
			name : config.botName,
		}));
	},
	play : function(boardStateString) {
		var boardState = JSON.parse(boardStateString); 
        
        if(logsEnabled)console.log(boardState);
        
		var canPlay = self.analyseBoardState(boardState, self.sendMove);
		
        if(!canPlay) {
			console.log('Game over!');
		}
	},
	analyseBoardState : function(boardState, callback) {
		var canPlay = self.canPlay(boardState);
		
		if(canPlay) {
			var board = new Buffer(boardState.board);
            // console.log(board);
			var enPassant = boardState.enPassant;
			if(enPassant) {
				var row = enPassant[0];
				var col = enPassant[1];
				board[config.boardIndexes[row][col]] = config.enPassantCode;
			}
			minimax.analyseBoard(board, callback);
		}
		return canPlay;
	},
	sendMove : function(from, to) {
		var move = {
			from : from,
			to : to,
		};
		var jsonMove = JSON.stringify(move);
		
		console.log('Send move : ' + jsonMove);
		connection.send(jsonMove);
	},
	canPlay : function(boardState) {
		var canPlay = boardState.winner == 0;
		canPlay = canPlay || boardState.white_infractions <= 5;
		canPlay = canPlay || boardState.black_infractions <= 5;
		canPlay = canPlay || !boardState['50moves'];
		canPlay = canPlay || !boardState.draw;
		
		return canPlay;
	},
};
