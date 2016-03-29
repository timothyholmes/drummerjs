(function() {

	angular.module('drummerJS')

	.directive('drumMachine', function () {

		var link = function (scope, ele, attrs) {
			var _this = this;
			var context = new AudioContext;

			function Kick(context) {
				var _this = this;

				_this.context = context;
			};

			Kick.prototype.setup = function() {
				var _this = this;

				_this.osc = _this.context.createOscillator();
				_this.gain = _this.context.createGain();
				_this.osc.connect(_this.gain);
				_this.gain.connect(_this.context.destination)
			};

			Kick.prototype.trigger = function(time) {
				var _this = this;

				_this.setup();

				_this.osc.frequency.setValueAtTime(200, time);
				_this.gain.gain.setValueAtTime(1, time);

				_this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
				_this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

				_this.osc.start(time);

				_this.osc.stop(time + 0.5);
			};

			function Snare(context) {
				var _this = this;

				_this.context = context;
			};

			Snare.prototype.noiseBuffer = function() {
				var _this = this;

				var bufferSize = _this.context.sampleRate;
				var buffer = _this.context.createBuffer(1, bufferSize, _this.context.sampleRate);
				var output = buffer.getChannelData(0);

				for (var i = 0; i < bufferSize; i++) {
					output[i] = Math.random() * 2 - 1;
				}

				return buffer;
			};

			Snare.prototype.setup = function() {
				var _this = this;

				_this.noise = _this.context.createBufferSource();
				_this.noise.buffer = _this.noiseBuffer();

				var noiseFilter = _this.context.createBiquadFilter();

				noiseFilter.type = 'highpass';
				noiseFilter.frequency.value = 1000;
				_this.noise.connect(noiseFilter);

				_this.noiseEnvelope = _this.context.createGain();
				noiseFilter.connect(_this.noiseEnvelope);

				_this.noiseEnvelope.connect(_this.context.destination);

				_this.osc = _this.context.createOscillator();
				_this.osc.type = 'triangle';

				_this.oscEnvelope = _this.context.createGain();
				_this.osc.connect(_this.oscEnvelope);
				_this.oscEnvelope.connect(_this.context.destination);
			};

			Snare.prototype.trigger = function(time) {
				var _this = this;

				_this.setup();

				_this.noiseEnvelope.gain.setValueAtTime(1, time);
				_this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
				_this.noise.start(time)

				_this.osc.frequency.setValueAtTime(100, time);
				_this.oscEnvelope.gain.setValueAtTime(0.7, time);
				_this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
				_this.osc.start(time)

				_this.osc.stop(time + 0.2);
				_this.noise.stop(time + 0.2);
			};

			var kick = new Kick(context);
			var now = context.currentTime;
			kick.trigger(now);

			var snare = new Snare(context);
			snare.trigger(now + 1);

			var refreshInterval;
			var currentBeat = 0;
			var beatOptions = [0, 1, 2, 3, 4, 5, 6, 7];
			var beatCols = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7', 'col8'];
				
			scope.bpm = 120;
			scope.startLoop = false;
			scope.paued = false;

			scope.samples = [];

			//var kick  = new Audio();			
			//kick.src  = "./components/kick.mp3";			
			//var snare = new Audio();
			//snare.src = "./components/snare.mp3";
			//var hihat = new Audio();
			//hihat.src = "./components/hihat.mp3";

			scope.loopingStatus = function() {
				return scope.startLoop;
			}

			scope.playSound = function(sound) {
				if(sound.on == true) {
					if(sound.type == 'kick')
						kick.play();
					if(sound.type == 'snare')
						snare.play();
					if(sound.type == 'hihat')
						hihat.play();
				}
			};

			scope.getClass = function(ele) {
				return ele.group;
			};

			scope.startTimer = function() {

				clearInterval(refreshInterval);

				refreshInterval = setInterval(function(){

					var arrayToSend = [];
					var x = document.getElementsByClassName('beatMarker');

					for(var i = 0; i < x.length; i++) {
						x[i].style.backgroundColor = "#00FF80";
					}

					document.getElementsByClassName(beatCols[currentBeat])[0].style.backgroundColor = "#FF0048";

					arrayToSend = scope.samples.filter(function(e) {
						return e.group == beatCols[currentBeat];
					});

					for (var i = 0; i < arrayToSend.length; i++) {
						scope.playSound(arrayToSend[i]);
					}

					currentBeat++;
					if(currentBeat >= 8) 
						currentBeat = 0;
				}, tempoSet(scope.bpm))
			};

			scope.stopTimer = function(){
				currentBeat = 0;
				clearInterval(refreshInterval);
			};

			scope.pauseTimer = function() {
				if(scope.paused == false)
					clearInterval(refreshInterval);
				else 
					scope.startTimer();
			};

			scope.clearPads = function() {
				for(var i = 0; i < scope.samples.length; i++)
					scope.samples[i].on = false;
			};

			var tempoSet = function(bpm) {
				return 60000 / (2 * bpm)
			}
		}

		var directiveDefinitionObject = {
			templateUrl: './templates/drum-machine.html',
			controller: 'MainController',
			controllerAs: 'mainCtrl',
			link: link
		};

		return directiveDefinitionObject;
	});
})();