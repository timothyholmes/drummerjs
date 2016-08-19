(function() {
    'use strict';

    angular.module('thUserInterface')

    /**
     * @ngdoc controller
     * @name SamplePadController
     * @module thUserInterface
     *
     * @description
     * Controller for sample pad controller
     */
    .controller('SamplePadController', [
        function() {
            var _this = this;
        }
    ])

    /**
     * @ngdoc directive
     * @name samplePad
     * @module thUserInterface
     *
     * @description
     * Creates directive for the sample pad
     */
    .directive('samplePad', function () {
        var samplePadDirective = {
            restrict: 'E',
            templateUrl: './templates/sample-pad.html',
            scope: {
                soundType: '='
            },
            bindToController: true,
            controller: 'SamplePadController',
            controllerAs: 'smplPdCtrl'
        };

        return samplePadDirective;
    });
})();
