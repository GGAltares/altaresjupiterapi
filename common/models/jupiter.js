'use strict';

var SOAPMiddleware = require('../../server/lib/SOAPMiddleware.js');

module.exports = function(Jupiter) {
	Jupiter.getMethodsGET = function(identification, refClient, sirenRna, cb) {

		SOAPMiddleware.intuizClient.getMethodes({
			identification: identification,
			refClient: refClient,
			sirenRna: sirenRna
		}, function(err, response) {
			if(err){
				cb(err);
			}
			else{
				if(!response.return.correct){
					cb(SOAPMiddleware.computeError(response));
				}
				else{
					cb(null, response);
				}				
			}			
		});	
	};

	Jupiter.remoteMethod(
		'getMethodsGET', {
			http: {
				path: '/getMethods',
				verb: 'get'
			},
			accepts: [{
				"arg": 'identification',
				"type": 'string',
				"required": true,
				"description": "A description",
				"default": "12345"
			}, {
				"arg": 'refClient',
				"type": 'string',
				"required": true,
				"description": "A description",
				"default": "12345"
			}, {
				"arg": 'sirenRna',
				"type": 'string',
				"required": true,
				"description": "A description",
				"default": "12345"
			}],
			returns: {
				arg: 'data',
				type: 'object',
				http: {
					source: 'body'
				}
			}
		}
	);
};
