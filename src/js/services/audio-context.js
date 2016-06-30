(function() {
    'use strict';

    angular.module('drummerJS')

    .service('audioContext', function($http){
        var _this = this,
            context = new AudioContext();

        _this.getContext = function() {
            return context;
        };
    });
})();
