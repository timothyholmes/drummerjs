(function() {
    'use strict';

    angular.module('thUserInterface')

    .controller('DrumMachineController', [
        'sampler',
        function(
            sampler
        ) {
            var _this = this;

            _this.sampler = sampler.getSampler();
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
