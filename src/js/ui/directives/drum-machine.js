(function() {
    'use strict';

    angular.module('thUserInterface')

    /**
     * @ngdoc controller
     * @name DrumMachineController
     * @module thUserInterface
     *
     * @requires drumMachineBuilder
     * @requires $document
     * @requires $interval
     * @requires timing
     *
     * @description
     * Controller for the drum machine
     *
     */
    .controller('DrumMachineController', [
        'drumMachineBuilder',
        '$document',
        'timing',
        '$scope',
        '$interval',
        function (
            drumMachineBuilder,
            $document,
            timing,
            $scope,
            $interval
        ) {
            var _this = this,
                refreshInterval;

            _this.sampler = drumMachineBuilder.getSampler();

            $scope.service = timing;

            /**
             * @ngdoc method
             * @name DrumMachineController#loop
             * @module thUserInterface
             *
             * @description
             * Starts the loop for the drum machine
             */
             _this.loop = function() {
                var currentBeat = 0;

                refreshInterval = $interval(function(){
                     var x = document.getElementsByClassName('beatMarker');
                     document.getElementsByClassName('col' + currentBeat)[0].style.backgroundColor = '#FF3C00';

                     var soundsToPlay = _this.sampler.filter(function(e) {
                         return e.class === 'col' + currentBeat;
                     });

                     console.log(soundsToPlay);

                     for(var i = 0; i < x.length; i++) {
                         console.log(x[i].style.backgroundColor);
                         x[i].style.backgroundColor = '#F5C009';
                     }

                     for (var j = 0; j < soundsToPlay.length; j++) {
                         if(soundsToPlay[i].on) {
                             soundsToPlay[i].play();
                         }
                     }

                     currentBeat++;
                     if(currentBeat >= 16) {
                     	currentBeat = 0;
                     }
                 }, 60000 / (4 * timing.getProperties().tempo));
            };

            _this.clearInterval = function () {
                $interval.cancel(refreshInterval);
            };

            $scope.$watch('service.getProperties().pause', function (newVal, oldVal) {
                if(newVal === false) {
                    _this.loop();
                } else if(newVal === true) {
                    _this.clearInterval();
                }
            });
        }
    ])

    /**
     * @ngdoc directive
     * @name drumMachine
     * @module thUserInterface
     *
     * @description
     * Creates directive for the drum machine
     */
    .directive('drumMachine', ['timing', function (timing) {

        var drumHeaderDirective = {
            templateUrl: './templates/drum-machine.html',
            controller: 'DrumMachineController',
            controllerAs: 'mchnCtrl'
        };

        return drumHeaderDirective;
    }]);
})();
