/*
 * Importação dos modulos usados
 */
var net = require('net');


/*
 * Definição do objeito
 */
var self = exports.connection = {
	/*
	 * Criação do socket
	 */
	socket : new require('net').Socket({
		readable : true,
		writable : true,
	}),
	/*
	 * Initialização dos listeners error e end
	 * do socket e initialização da conexão com o servidor
	 */
	init : function(port, host, callback) {
		self.socket.on('error', console.log);
		self.socket.on('end', function() {
			console.log('Connection closed!');
		});
		
		self.socket.connect(port, host, function(){
			console.log('Connection established!');
			callback();
		});
	},
	/*
	 * Escritura de dados no socket pelo servidor
	 */
	send : function(data) {
		self.socket.write(data, 'UTF8', function(){
			console.log('Data sent!');
		});
	},
	/*
	 * Leitura no socket, esta chamada a cada vez
	 * que o servidor envia dados
	 */
	listen : function(callback) {
		self.socket.on('data', function(data) {
			console.log('Data received!');
			callback(data.toString());
		});
	},
};