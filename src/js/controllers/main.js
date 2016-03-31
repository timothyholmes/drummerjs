(function() {

	'use strict';

	angular.module('drummerJS')

	.controller('MainController', function($scope, dataManager){
		var _this = this;
		var context = new AudioContext;

		var drumKit = {
			kick: new Kick(context),
			snare: new Snare(context),
			hihat: new HiHat(context)
		}

		_this.sampler = [];

		var initSampler = function() {
			for(var i = 0; i < 4; i++) {
				var type = '';

				if(i < 2)
					type = i == 0 ? 'marker' : 'kick';
				else if(i >= 2)
					type = i == 2 ? 'snare' : 'hihat';

				for(var j = 0; j <= 7; j++) {
					_this.sampler.push({
						type: type,
						on: false,
						class: 'col' + j
					})
				}
			}
		}

		initSampler();

		var refreshInterval;
		var currentBeat = 0;
		var beatCols = ['col0', 'col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7'];
				
		_this.bpm = 120;
		_this.startLoop = false;
		_this.paued = false;

		_this.loopingStatus = function() {
			return _this.startLoop;
		}

		_this.playSound = function(sound) {
			var now = context.currentTime;
			if(sound.on == true) {
				if(sound.type == 'kick')
					drumKit.kick.trigger(now);
				if(sound.type == 'snare')
					drumKit.snare.trigger(now);
				if(sound.type == 'hihat')
					drumKit.hihat.trigger(now);
			}
		};

		_this.getClass = function(ele) {
			return ele.class;
		};

		_this.startTimer = function() {

			clearInterval(refreshInterval);

			refreshInterval = setInterval(function(){

				var arrayToSend = [];
				var x = document.getElementsByClassName('beatMarker');

				for(var i = 0; i < x.length; i++) {
					x[i].style.backgroundColor = "#00FF80";
				}

				document.getElementsByClassName(beatCols[currentBeat])[0].style.backgroundColor = "#FF0048";

				arrayToSend = _this.sampler.filter(function(e) {
					return e.class == beatCols[currentBeat];
				});

				for (var i = 0; i < arrayToSend.length; i++) {
					_this.playSound(arrayToSend[i]);
				}

				currentBeat++;
				if(currentBeat >= 8) 
					currentBeat = 0;
			}, tempoSet(_this.bpm))
		};

		_this.stopTimer = function(){
			currentBeat = 0;
			clearInterval(refreshInterval);
		};

		_this.pauseTimer = function() {
			if(_this.paused == false)
				clearInterval(refreshInterval);
			else 
				_this.startTimer();
		};

		_this.clearPads = function() {
			for(var i = 0; i < _this.sampler.length; i++)
				_this.sampler[i].on = false;
		};

		var tempoSet = function(bpm) {
			return 60000 / (2 * bpm)
		}
	});
})();