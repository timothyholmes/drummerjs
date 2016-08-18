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

            _this.setTempo = function(bpm) {
                _this.properties.tempo = 60000 / (4 * bpm);
            };

            _this.getTempo = function() {
                return _this.properties.tempo;
            };

            _this.getRefreshInterval = function() {
                return _this.properties.refreshInterval;
            };

            _this.togglePause = function(statu) {
                _this.properties.pause = !_this.properties.pause;
            };

            _this.getPauseStatus = function() {
                return _this.properties.pause;
            };

            _this.pauseTimer = function() {
                if(_this.properties.pause === false) {
                    clearInterval(_this.properties.refreshInterval);
                } else {
                    _this.startTimer();
                }
            };

            _this.stopTimer = function(){
                _this.properties.currentBeat = 0;
                clearInterval(_this.properties.refreshInterval);
            };

            _this.startTimer = function() {

                clearInterval(_this.properties.refreshInterval);

                _this.properties.refreshInterval = setInterval(function(){
                    var x = $document.getElementsByClassName('beatMarker');
                    // document.getElementsByClassName('col' + _this.properties.currentBeat)[0].style.backgroundColor = "#FF3C00";

                    var soundsToPlay = _this.sampler.filter(function(e) {
                        return e.class === 'col' + _this.properties.currentBeat;
                    });

                    for(var i = 0; i < x.length; i++) {
                    	x[i].style.backgroundColor = '#F5C009';
                    }

                    for (var j = 0; j < soundsToPlay.length; j++) {
                        if(soundsToPlay[i].on) {
                            soundsToPlay[i].play();
                        }
                    }

                    _this.properties.currentBeat++;
                    if(_this.properties.currentBeat >= 16) {
                    	_this.properties.currentBeat = 0;
                    }
                }, _this.setTempo(_this.bpm));
            };
        }
    ]);
})();
