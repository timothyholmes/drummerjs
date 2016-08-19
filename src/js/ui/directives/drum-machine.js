(function() {
    'use strict';

    angular.module('thUserInterface')

    .controller('DrumMachineController', [
        'drumMachineBuilder',
        '$document',
        '$interval',
        'timing',
        function(
            drumMachineBuilder,
            $document,
            $interval,
            timing
        ) {
            var _this = this;

            _this.sampler = drumMachineBuilder.getSampler();

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

    .directive('drumMachine', function () {

        var drumHeaderDirective = {
            templateUrl: './templates/drum-machine.html',
            controller: 'DrumMachineController',
            controllerAs: 'mchnCtrl'
        };

        return drumHeaderDirective;
    });
})();
