(function() {
    'use strict';

	angular.module('drummerJS')

    .controller('DrumHeaderController', [
        'sampler',
        function(
            sampler
        ) {
            var _this = this;

            _this.sampler = sampler.getSampler();

            _this.clearPads = function() {
                for(var i = 0; i < _this.sampler.length; i++)
                    _this.sampler[i].on = false;
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
