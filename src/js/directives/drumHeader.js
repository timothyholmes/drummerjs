(function() {

	angular.module('drummerJS')

	.directive('drumHeader', function () {
		return {
			templateUrl: '../templates/drum-header.html',
			controller: 'MainController',
			controllerAs: 'mainCtrl'
		};
	});
})();