(function() {

	angular.module('drummerJS')

	.directive('drumMachine', function () {

		var link = function (scope, ele, attrs) {
			var kick  = new Audio();
			var snare = new Audio();
			var hihat = new Audio();

			var refreshInterval;
			var currentBeat = 0;
			var beatOptions = [0, 1, 2, 3, 4, 5, 6, 7];
			var beatCols = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7', 'col8'];
				
			scope.bpm = 120;
			scope.startLoop = false;
			scope.paued = false;

			scope.samples = [];

			kick.src  = "./components/kick.mp3";
			snare.src = "./components/snare.mp3";
			hihat.src = "./components/hihat.mp3";

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