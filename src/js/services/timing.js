(function() {
    'use strict';

    angular.module('drummerJS')

    .service('timing', function($http){
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

        _this.togglePause = function(statu) {
            _this.properties.pause = !_this.properties.pause;
        };

        _this.getPauseStatus = function() {
            return _this.properties.pause;
        };

        _this.pauseTimer = function() {
            if(_this.properties.pause === false)
                clearInterval(refreshInterval);
            else
                _this.startTimer();
        };

        _this.stopTimer = function(){
            _this.properties.currentBeat = 0;
            clearInterval(refreshInterval);
        };

        _this.startTimer = function() {

            clearInterval(refreshInterval);

            refreshInterval = setInterval(function(){

            var x = document.getElementsByClassName('beatMarker');

            for(var i = 0; i < x.length; i++) {
            	x[i].style.backgroundColor = '#F5C009';
            }

            document.getElementsByClassName('col' + _this.properties.currentBeat)[0].style.backgroundColor = "#FF3C00";

            var soundsToPlay = _this.sampler.filter(function(e) {
            	return e.class == 'col' + _this.properties.currentBeat;
            });

            for (var j = 0; j < soundsToPlay.length; j++) {
            	_this.playSound(soundsToPlay[i]);
            }

            _this.properties.currentBeat++;
            if(_this.properties.currentBeat >= 16)
            	_this.properties.currentBeat = 0;
            }, _this.setTempo(_this.bpm));
        };
    });
})();
