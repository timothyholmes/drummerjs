(function() {
    'use strict';

	angular.module('thUserInterface')

    .controller('DrumHeaderController', [
        'timing',
        function(
            timing
        ) {
            var _this = this;

            _this.startTimer = function() {
                timing.startTimer();
            };

            _this.stopTimer = function () {
                timing.stopTimer();
            };
        }
    ])

    .directive('drumHeader', function () {

        var drumHeaderDirective = {
            templateUrl: './templates/drum-header.html',
            controller: 'DrumHeaderController',
            controllerAs: 'hdrCtrl'
        };

        return drumHeaderDirective;
    });
})();
