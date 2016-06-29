(function() {
    'use strict';

	angular.module('drummerJS')

	.directive('drumHeader', function () {

		var directiveDefinitionObject = {
			templateUrl: './templates/drum-header.html',
			controller: 'MainController',
			controllerAs: 'mainCtrl'
		};

		return directiveDefinitionObject;
	});
})();
