/**
 * 
 */


/*
 * Importação dos modulos usados
 */
var net = require('net');


/*
 * Definição do objeito
 */
var self = exports.connection = {
	socket : new require('net').Socket({
		readable : true,
		writable : true,
	}),
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
	send : function(data) {
		self.socket.write(data, 'UTF8', function(){
			console.log('Data sent!');
            // console.log(data);
		});
	},
	listen : function(callback) {
		self.socket.on('data', function(data) {
			console.log('Data received!');
			callback(data.toString());
		});
	},
};