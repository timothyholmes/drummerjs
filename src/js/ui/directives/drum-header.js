(function() {
    'use strict';

	angular.module('thUserInterface')

    .controller('DrumHeaderController', [
        'timing',
        function(
            timing
        ) {
            var _this = this;

            _this.bpm = timing.getBPM();

            _this.addBPM = function() {
                timing.setBPM(1);
                _this.bpm = timing.getBPM();
            };

            _this.subBPM = function() {
                timing.setBPM(-1);
                _this.bpm = timing.getBPM();
            };

            _this.loop = function() {
                timing.togglePause();
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
