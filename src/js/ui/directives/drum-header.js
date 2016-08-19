(function() {
    'use strict';

	angular.module('thUserInterface')

    /**
     * @ngdoc controller
     * @name DrumHeaderController
     * @module thUserInterface
     *
     * @requires timing
     *
     * @description
     * Controller for the header
     *
     */
    .controller('DrumHeaderController', [
        'timing',
        function(
            timing
        ) {
            var _this = this;

            _this.bpm = timing.getProperties().tempo;

            /**
             * @ngdoc method
             * @name DrumHeaderController#addBPM
             *
             * @description
             * Increments the BPM by 1
             */
            _this.addBPM = function() {
                timing.adjustTempo(1);
                _this.bpm = timing.getProperties().tempo;
            };

            /**
             * @ngdoc method
             * @name DrumHeaderController#subBPM
             *
             * @description
             * Decrements the BPM by 1
             */
            _this.subBPM = function() {
                timing.adjustTempo(-1);
                _this.bpm = timing.getProperties().tempo;
            };

            /**
             * @ngdoc method
             * @name DrumHeaderController#loop
             *
             * @description
             * Calls the timing service's togglePause method
             */
            _this.loop = function() {
                timing.togglePause();
            };
        }
    ])

    /**
     * @ngdoc directive
     * @name drumHeader
     * @module thUserInterface
     *
     * @description
     * Creates directive for the header controls
     */
    .directive('drumHeader', function () {

        var drumHeaderDirective = {
            templateUrl: './templates/drum-header.html',
            controller: 'DrumHeaderController',
            controllerAs: 'hdrCtrl'
        };

        return drumHeaderDirective;
    });
})();
