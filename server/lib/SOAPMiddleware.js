'use strict';

var soap = require('soap');

module.exports = {
	intuizClient: null,
	init: function(cb) {
		var url = 'http://iws.altares.fr/iws-v3.7/services/CallistoIdentite?wsdl';
		soap.createClient(url, function(err, client) {
			this.intuizClient = client;
			cb();
		}.bind(this));
	},
	computeError: function(response) {
		var error = new Error(JSON.stringify({
			code: response.return.exception.code,
			description: response.return.exception.description,
			erreur: response.return.exception.erreur
		}));
		error.statusCode = 422;
		return error;
	}
};