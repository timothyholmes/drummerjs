(function() {
    'use strict';

    angular.module('drummerJS')

    .controller('DrumMachineController', [
        'audioContext',
        'drumKit',
        function(
            audioContext,
            drumKit
        ) {
            var _this = this;

            _this.drumKit = drumKit.buildKit();

            _this.playSound = function(sound) {
                var now = audioContext.getContext().currentTime;
                if(sound.on === true) {
                    _this.drumKit[sound.type].trigger(now);
                }
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
