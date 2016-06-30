(function() {
    'use strict';

    angular.module('drummerJS')

    .controller('DrumMachineController', [
        function() {
            var _this = this;

            _this.loopingStatus = function() {
                return _this.startLoop;
            };

            _this.playSound = function(sound) {
                var now = context.currentTime;
                if(sound.on === true) {
                    drumKit[sound.type].trigger(now);
                }
            };
    }])

    .directive('drumMachine', function () {

        var drumHeaderDirective = {
            templateUrl: './templates/drum-machine.html',
            controller: 'DrumMachineController',
            controllerAs: 'mchnCtrl'
        };

        return drumHeaderDirective;
    });
})();
