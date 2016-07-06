(function() {
    'use strict';

	angular.module('thUserInterface')

    .controller('DrumHeaderController', [
        'sampler',
        function(
            sampler
        ) {
            var _this = this;

            _this.sampler = sampler.getSampler();

            _this.clearPads = function() {
                sampler.clearPads();
            };
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
