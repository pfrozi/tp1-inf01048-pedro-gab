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
	/*
	 * Cor dos peões do bot
	 */
	color : config.white,
	/*
	 * Initializa a cor das peças do bot e a conexão
	 */
	init : function(options) {		
		var optionsLength = options.length;
		var host = optionsLength == 3 ? options[2] : 'localhost';
		var port = config.whitePort;
		
		if(optionsLength == 4 && options[3] == 'black') {
			self.color = config.black;
			port = config.blackPort;
		}
        
		minimax.init(self.color,self.color^1);
		
		connection.init(port, host, self.sendName);
		connection.listen(self.play);
	},
	/*
	 * Envia o nome do bot para o servidor
	 */
	sendName : function() {
		connection.send(JSON.stringify({
			name : config.botName,
		}));
	},
	/*
	 * Se o servidor envia um estado que disse que o bot
	 * pode jogar, o bot faz um novo movimento
	 */
	play : function(boardStateString) {
		var boardState = JSON.parse(boardStateString);         
		var canPlay = self.analyseBoardState(boardState, self.sendMove);
		
        if(!canPlay) {
			console.log('Game over!');
		}
	},
	/*
	 * O bot escolha o movimento que ele vai fazer se ele pode jogar
	 */
	analyseBoardState : function(boardState, callback) {
		var canPlay = self.canPlay(boardState);
		
		if(canPlay) {
			var board = new Buffer(boardState.board);
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
	/*
	 * Envia o movimento que o bot vai fazer
	 */
	sendMove : function(from, to) {
		var move = {
			from : from,
			to : to,
		};
		var jsonMove = JSON.stringify(move);
		
		console.log('Send move : ' + jsonMove);
		connection.send(jsonMove);
	},
	/*
	 * Testa com as informações no estado enviado pelo servidor
	 * se o bot pode jogar
	 */
	canPlay : function(boardState) {
        var canPlay = boardState.winner == 0;
        canPlay = canPlay && boardState.white_infractions <= 5;
        canPlay = canPlay && boardState.black_infractions <= 5;
        canPlay = canPlay && !boardState['50moves'];
        canPlay = canPlay && !boardState.draw;
        
        return canPlay;
	},
};
