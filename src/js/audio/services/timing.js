(function() {
    'use strict';

    angular.module('thAudioComponents')

    .service('timing', [
        '$document',
        function(
            $document
        ){
            var _this = this;

            _this.properties = {
                tempo: 120,
                pause: true,
                currentBeat: 0,
                refreshInterval: 0,
                startLoop: false
            };

            _this.setBPM = function(inc) {
                _this.properties.tempo = _this.properties.tempo + inc;
            };

            _this.getBPM = function(inc) {
                return _this.properties.tempo;
            };
        }
    ]);
})();
