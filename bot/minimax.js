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
    boardFrom: null,
    boardTo: null,
    depthPoint: 0,
    lasted4Play: [],
    /*
     * Initialização do objeito, definição de quem
     * é a cor a minimizar o score é quem é a cor a
     * maximizar o score
     */
	init : function(maxPlayer, minPlayer) {
		self.maxPlayer = maxPlayer;
		self.minPlayer = minPlayer;
	},
	/*
	 * Começa a busca minimax com poda alpha-beta
	 */
	analyseBoard : function(board, callback) {
		self.time = new Date().getTime();
		self.alphaBetaSearch(board, callback);
	},
	/*
	 * Função principal do algoritmo minimax com poda alpha-beta
	 */
	alphaBetaSearch : function(board, callback) {
        self.boardFrom = board;
        self.boardTo = null;
        self.depthPoint = 0;
        
        self.maxValue(board, -config.infinity, config.infinity, 0);
        
        if(!self.boardTo){
            console.log('Board To is null');
            var nextBoards = move.possibleMoves(self.boardFrom, self.maxPlayer);
            self.boardTo = nextBoards[0];
        }
        
        var position = self.extractCoord(self.boardFrom, self.boardTo);
        
        if(self.lasted4Play.length < 4){
            var boardBuff = new Buffer(config.boardSize);
            self.boardTo.copy(boardBuff);
            self.lasted4Play.push(boardBuff);
        }
        else{
            self.lasted4Play = [];
        }
        
        callback(position[0], position[1]);
	},
	/*
	 * Cálculo da valor máxima do algoritmo minimax
	 */
	maxValue : function(board, alpha, beta, depth) {
        if(self.timeIsOut() || depth > config.depthMax) {
        	return weighting.evaluate(board, self.maxPlayer);
		}
        var nextBoards = move.possibleMoves(board, self.maxPlayer);
		if(!nextBoards) {
			return weighting.evaluate(board, self.maxPlayer);
		}
        
		for(var i in nextBoards) {
            var decision = alpha; 
			alpha = Math.max(alpha, self.minValue(nextBoards[i], alpha, beta, depth + 1));
            
            if(depth == 0){
                self.depthPoint++;
                samePlay = self.isSamePlay(nextBoards[i]);
                
                if(alpha > decision && !samePlay){
                    self.boardTo = nextBoards[i];
                }
            }
            if(alpha >= beta) {
                break;
            }
        }
		
		return alpha;
	},
	/*
	 * Cálculo da valor mínima do algoritmo minimax
	 */
	minValue : function(board, alpha, beta, depth) {
        if(self.timeIsOut() || depth > config.depthMax) {
        	return weighting.evaluate(board, self.minPlayer);
		}
        var nextBoards = move.possibleMoves(board, self.minPlayer);
		if(!nextBoards) {
			return weighting.evaluate(board, self.minPlayer);
		}
		for(var i in nextBoards) {
            beta = Math.min(beta, self.maxValue(nextBoards[i], alpha, beta, depth + 1));
            
            if(beta <= alpha) {
                break;
            }
        }
		return beta;
	},
	/*
	 * Verifica se o movimento que o bot se prepara a fazer
	 * e o mesmo que esse que ele faz antes
	 */
    isSamePlay : function(board){
        var equal = false;
        for(var i=0;i<self.lasted4Play.length && !equal;i++){
            var equal = true;
            for(var j=0;j<board.length && equal;j++){
                equal = equal && self.lasted4Play[i][j]==board[j];
            }
        }
        return equal;
    },
    /*
     * A partir dos estados antes e depois dos movimentos,
     * retorna o vetor de movimento que o bot vai fazer
     */
    extractCoord : function(board1, board2) {
        var coordFrom = null;
        var coordTo = null;
        
        var rowMax = config.boardHeight;
        var colMax = config.boardWidth;
        var boardIdx = config.boardIndexes;
        
        ext:
        for(var i = 0; i < rowMax; i++) {
            for(var j = 0; j < colMax; j++) {
                if(board1[boardIdx[i][j]] != board2[boardIdx[i][j]]) {
                    if(board2[boardIdx[i][j]] == config.emptySquareCode) {
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
        /*
         * Para debugar
         */
        /*console.log('Count of possible games: '+nextBoards.length);
        console.log('depthPoint: '+self.depthPoint);
        console.log('new Alpha: '+ weighting.evaluate(board2, self.maxPlayer));
        console.log('Board From');
        console.log(config.printBoard(board1));
        console.log('Board To');
        console.log(config.printBoard(board2));*/
        
        return [coordFrom, coordTo];
    },
    /*
     * Testa se o tempo de busca (5.9) segundos esta terminado
     */
	timeIsOut : function() {
		return new Date().getTime() - self.time >= config.searchTimeOut;
	},
};