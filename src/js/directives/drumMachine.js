(function() {

	angular.module('drummerJS')

	.directive('drumMachine', function () {

		var link = function (scope, ele, attrs) {
			var _this = this;
			var context = new AudioContext;

			var drumKit = {
				kick: new Kick(context),
				snare: new Snare(context),
				hihat: new HiHat(context)
			}

			scope.sampler = [];

			var initSampler = function() {
				for(var i = 0; i < 4; i++) {
					var type = '';

					if(i ==0)
						type = 'marker';
					else if(i == 1)
						type = 'kick';
					else if(i == 2)
						type = 'snare';
					else if(i ==3)
						type = 'hihat';

					for(var j = 0; j <= 7; j++) {
						scope.sampler.push({
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
			var beatOptions = [0, 1, 2, 3, 4, 5, 6, 7];
			var beatCols = ['col0', 'col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7'];
				
			scope.bpm = 120;
			scope.startLoop = false;
			scope.paued = false;

			scope.samples = [];

			scope.loopingStatus = function() {
				return scope.startLoop;
			}

			scope.playSound = function(sound) {
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

			scope.getClass = function(ele) {
				return ele.class;
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

					arrayToSend = scope.sampler.filter(function(e) {
						return e.class == beatCols[currentBeat];
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