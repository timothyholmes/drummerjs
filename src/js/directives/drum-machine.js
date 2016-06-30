(function() {
    'use strict';

    angular.module('drummerJS')

    .controller('DrumMachineController', [
        function() {
            var _this = this;

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
