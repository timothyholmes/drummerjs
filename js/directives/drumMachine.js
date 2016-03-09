(function() {

	angular.module('drummerJS')

	.directive('drumMachine', function () {
		return {
			templateUrl: './templates/drum-machine.html',
			controller: 'MainController',
			controllerAs: 'mainCtrl',
			link: function (scope, ele, attrs) {
				
			}
		};
	});
})();