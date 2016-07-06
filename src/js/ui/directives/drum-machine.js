(function() {
    'use strict';

    angular.module('thUserInterface')

    .controller('DrumMachineController', [
        'drumMachineBuilder',
        function(
            drumMachineBuilder
        ) {
            var _this = this;

            _this.sampler = drumMachineBuilder.getSampler();
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
