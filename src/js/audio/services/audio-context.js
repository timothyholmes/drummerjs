(function() {
    'use strict';

    angular.module('thAudioComponents')

    .service('audioContext', function(){
        var _this = this,
            context = new AudioContext();

        _this.getContext = function() {
            return context;
        };
    });
})();
