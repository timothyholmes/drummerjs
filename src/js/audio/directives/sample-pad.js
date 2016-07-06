(function() {
    'use strict';

    angular.module('thAudioComponents')

    .controller('SamplePadController', [
        function() {
            var _this = this;
        }
    ])

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
