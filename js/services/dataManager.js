(function() {

	'use strict';

	angular.module('drummerJS')
	
	.service('dataManager', function($http){

		this.getData = function(path, callback) {
			$http.get(path)
			.then(callback)
		};
	});
	
})();