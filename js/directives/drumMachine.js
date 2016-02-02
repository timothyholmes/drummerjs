(function() {

	angular.module('drummerJS')

	.directive('drumMachine', function () {
		return {
			templateUrl: './templates/drum-machine.html',
			controller: 'mainCtrl',
			replace: true
		};
	});
})();