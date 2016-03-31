(function() {

	angular.module('drummerJS')

	.directive('drumMachine', function () {

		var directiveDefinitionObject = {
			templateUrl: './templates/drum-machine.html',
			controller: 'MainController',
			controllerAs: 'mainCtrl'
		};

		return directiveDefinitionObject;
		
	});
})();