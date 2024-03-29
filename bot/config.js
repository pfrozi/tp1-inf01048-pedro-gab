/*
 * Definição do objeito
 */
var self = exports.config = {
	white : 0,
	black : 1,
    host  : 'localhost',
	whitePort : 50100,
	blackPort : 50200,
	botName : 'Gabriel e Pedro',
	boardWidth : 8,
	boardHeight : 8,
    boardSize : 64,
    /*
     * O mapping dos peões entre o buffer
     * e a tabela de jogo, para falicitar as manipulações
     * sobre as peças
     */
	boardIndexes : [[56, 57, 58, 59, 60, 61, 62, 63],
	                [48, 49, 50, 51, 52, 53, 54, 55],
	                [40, 41, 42, 43, 44, 45, 46, 47],
	                [32, 33, 34, 35, 36, 37, 38, 39],
	                [24, 25, 26, 27, 28, 29, 30, 31],
	                [16, 17, 18, 19, 20, 21, 22, 23],
	                [8, 9, 10, 11, 12, 13, 14, 15],
	                [0, 1, 2, 3, 4, 5, 6, 7]],
	infinity : 1000000000000000,
	searchTimeOut : 5500,
	enPassantCode : 33, // código no buffer para um en passant
	emptySquareCode : 46, // código no buffer para uma casa sem peça
	/*
	 * Códigos no buffer para cada peças, 0 e 1 são as cores das peças,
	 * mais baixo tem o nome da peça com seu código
	 */
	piecesCodeMap : {
		0 : [66, 78, 80, 81, 82],
		1 : [98, 110, 112, 113, 114],
	},
	/*
	 * Códigos dos peões no buffer, 0 e 1 são as cores das peças
	 */
	pawnsCodeMap : {
		0 : 80,
		1 : 112,
	},
	/*
	 * Para cada cor, o número da última linha dessa cor, onde
	 * ela ganha
	 */
	lastRowMap : {
		0 : 7,
		1 : 0,
	},
	/*
	 * Códigos no buffer para cada peças
	 */
    piecesNames : {
        113 : ' bQueen  ',
        114 : ' bTower  ',
        98  : ' bBishop ',
        110 : ' bKnight ',
        112 : ' bPawn   ',
        81  : ' bQueen  ',
        82  : ' wTower  ',
        66  : ' wBishop ',
        78  : ' wKnight ',
        80  : ' wPawn   ',
        33  : ' passant ',
        46  : '    .    ',
    
    },
    /*
     * Profundidade máxima de busca no árvore
     */
    depthMax : 3,
    /*
     * Para debugar
     */
    /*printBoard : function(board){
    
        var strBoard = '';
        for(var i = 0; i < self.boardHeight; i++) {
            for(var j = 0; j < self.boardWidth; j++) {
                strBoard += self.piecesNames[board[self.boardIndexes[i][j]]];
            }
            strBoard += '\r\n';
        }
        return strBoard;
    }*/
};