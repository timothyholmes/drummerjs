(function() {

	'use strict';

	angular.module('drummerJS')

	.controller('MainController', function($scope, dataManager){
		var _this = this;
		var context = new AudioContext;

		_this.paused = false;

		_this.grinding = {
			name: 'grinding',
			kicks: ['col0', 'col6', 'col7', 'col9', 'col10', 'col13', 'col15'],
			snares: ['col4', 'col12'],
			hihats: ['col4', 'col12'],
			openhats: ['col4', 'col12'],
			lowtoms: ['col0', 'col6', 'col7', 'col9', 'col10', 'col13', 'col15'],
			hitoms: []
		}

		var drumKit = {
			kick: new Kick(context),
			snare: new Snare(context),
			hihat: new HiHat(context),
			openhat: new OpenHat(context),
			lowtom: new LowTom(context),
			hitom: new HiTom(context)
		}

		_this.sampler = [];

		var initSampler = function() {
			for(var i = 0; i < 7; i++) {
				var type = '';

				if(i < 2)
					type = i == 0 ? 'marker' : 'kick';
				else if(i >= 2 && i < 4)
					type = i == 2 ? 'snare' : 'hihat';
				else if(i >= 4 && i < 6)
					type = i == 4 ? 'openhat' : 'lowtom';
				else
					type = 'hitom';

				for(var j = 0; j <= 15; j++) {
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
				
		_this.bpm = 120;
		_this.startLoop = false;
		_this.paued = false;

		_this.loopingStatus = function() {
			return _this.startLoop;
		}

		_this.playSound = function(sound) {
			var now = context.currentTime;
			if(sound.on == true) {
				drumKit[sound.type].trigger(now);
			}
		};

		_this.getClass = function(ele) {
			return ele.class;
		};

		_this.startTimer = function() {

			clearInterval(refreshInterval);

			refreshInterval = setInterval(function(){

				var x = document.getElementsByClassName('beatMarker');

				for(var i = 0; i < x.length; i++) {
					x[i].style.backgroundColor = '#F5C009';
				}

				document.getElementsByClassName('col' + currentBeat)[0].style.backgroundColor = "#FF3C00";

				var soundsToPlay = _this.sampler.filter(function(e) {
					return e.class == 'col' + currentBeat;
				});

				for (var i = 0; i < soundsToPlay.length; i++) {
					_this.playSound(soundsToPlay[i]);
				}

				currentBeat++;
				if(currentBeat >= 16) 
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

		/** http://stackoverflow.com/questions/7378228/check-if-an-element-is-present-in-an-array */

		var arrayCheck = function(value, array) {
		    return array.indexOf(value) > -1;
		}

		_this.setSampleLoop = function(sampleLoop) {
			if(sampleLoop.name == 'grinding')
				_this.bpm = 100;

			for(var i = 0; i < _this.sampler.length; i++) {
				if(_this.sampler[i].type == 'kick') 
					_this.sampler[i].on = arrayCheck(_this.sampler[i].class, sampleLoop.kicks) ? true : false;
				else if(_this.sampler[i].type == 'snare') 
					_this.sampler[i].on = arrayCheck(_this.sampler[i].class, sampleLoop.snares) ? true : false;
				else if(_this.sampler[i].type == 'hihat') 
					_this.sampler[i].on = arrayCheck(_this.sampler[i].class, sampleLoop.hihats) ? true : false;
				else if(_this.sampler[i].type == 'openhat') 
					_this.sampler[i].on = arrayCheck(_this.sampler[i].class, sampleLoop.openhats) ? true : false;
				else if(_this.sampler[i].type == 'lowtom') 
					_this.sampler[i].on = arrayCheck(_this.sampler[i].class, sampleLoop.lowtoms) ? true : false;
				else if(_this.sampler[i].type == 'hitom') 
					_this.sampler[i].on = arrayCheck(_this.sampler[i].class, sampleLoop.hitoms) ? true : false;
			}
		}

		var tempoSet = function(bpm) {
			return 60000 / (4 * bpm)
		}
	});
})();