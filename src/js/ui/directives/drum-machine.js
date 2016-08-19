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
        function (
            drumMachineBuilder,
            $document,
            timing,
            $scope
        ) {
            var _this = this;

            _this.sampler = drumMachineBuilder.getSampler();

            $scope.$watch(function () {
                return timing.getProperties();
            },
            function (newVal) {
                console.log(newVal);
            });

            /**
             * @ngdoc method
             * @name DrumMachineController#loop
             * @module thUserInterface
             *
             * @description
             * Starts the loop for the drum machine
             */
            _this.loop = function() {
                var currentBeat = 0,
                    refreshInterval;

                clearInterval(refreshInterval);

                refreshInterval = setInterval(function(){
                     var x = $document[0].getElementsByClassName('beatMarker');
                     $document.getElementsByClassName('col' + currentBeat)[0].style.backgroundColor = '#FF3C00';

                     console.log(x);

                     var soundsToPlay = _this.sampler.filter(function(e) {
                         return e.class === 'col' + currentBeat;
                     });

                     for(var i = 0; i < x.length; i++) {
                     	x[i].style.backgroundColor = '#F5C009';
                     }

                     for (var j = 0; j < soundsToPlay.length; j++) {
                         if(soundsToPlay[i].on) {
                             soundsToPlay[i].play();
                         }
                     }

                     _this.properties.currentBeat++;
                     if(_this.properties.currentBeat >= 16) {
                     	_this.properties.currentBeat = 0;
                     }
                 }, 60000 / (4 * timing.getBPM()));
            };
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
            controllerAs: 'mchnCtrl',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return timing.getProperties();
                },
                function (newVal) {
                    console.log(newVal);
                });
            }
        };

        return drumHeaderDirective;
    }]);
})();
