(function() {
    'use strict';

	angular.module('drummerJS')

    .controller('DrumHeaderController', [
        '$scope',
        function(
            $scope
        ) {
            var _this = this;

    }])

	.directive('drumHeader', function () {

		var drumHeaderDirective = {
			templateUrl: './templates/drum-header.html',
			controller: 'DrumHeaderController',
			controllerAs: 'hdrCtrl'
		};

		return drumHeaderDirective;
	});
})();
