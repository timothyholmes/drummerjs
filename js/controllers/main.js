(function() {

	'use strict';

	angular.module('drummerJS')

	.controller('mainCtrl', function($scope, dataManager){

		var refreshInterval;
		var beatOptions = [0, 1, 2, 3, 4, 5, 6, 7];

		var kick  = new Audio();
		var snare = new Audio();
		var hihat = new Audio();

		$scope.bpm = 120;
		$scope.startLoop = false;
		$scope.paued = false;

		var samples = [];
		var currentBeat = 0;
		var beatCols = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7', 'col8'];

		kick.src  = "./assets/sounds/kick.mp3";
		snare.src = "./assets/sounds/snare.mp3";
		hihat.src = "./assets/sounds/hihat.mp3";

		dataManager.getData('./config/samples.json', function(response) {
			samples = response.data;

			$scope.kicks = samples.filter(function(e) {
				return e.type == 'kick';
			});

			$scope.snares = samples.filter(function(e) {
				return e.type == 'snare';
			});

			$scope.hihats = samples.filter(function(e) {
				return e.type == 'hihat';
			});

			$scope.markers = samples.filter(function(e) {
				return e.type == 'marker';
			});
		});

		$scope.loopingStatus = function() {
			return $scope.startLoop;
		}

		$scope.playSound = function(sound) {
			if(sound.on == true) {
				if(sound.type == 'kick')
					kick.play();
				if(sound.type == 'snare')
					snare.play();
				if(sound.type == 'hihat')
					hihat.play();
			}
		};

		$scope.getClass = function(ele) {
			return ele.group;
		};

		$scope.startTimer = function() {

			clearInterval(refreshInterval);

			refreshInterval = setInterval(function(){

			var arrayToSend;

			var nonCurrentBeats = beatOptions.filter(function(e) {
				return e != currentBeat;
			});

			var x = document.getElementsByClassName(beatCols[currentBeat]);
			var y = document.getElementsByClassName(beatCols[nonCurrentBeats[0]]);
			var w = document.getElementsByClassName(beatCols[nonCurrentBeats[1]]);
			var z = document.getElementsByClassName(beatCols[nonCurrentBeats[2]]);
			var a = document.getElementsByClassName(beatCols[nonCurrentBeats[3]]);
			var b = document.getElementsByClassName(beatCols[nonCurrentBeats[4]]);
			var c = document.getElementsByClassName(beatCols[nonCurrentBeats[5]]);
			var d = document.getElementsByClassName(beatCols[nonCurrentBeats[6]]);

			x[0].style.backgroundColor = "#FF0048";
			y[0].style.backgroundColor = "#00FF80";
			w[0].style.backgroundColor = "#00FF80";
			z[0].style.backgroundColor = "#00FF80";
			a[0].style.backgroundColor = "#00FF80";
			b[0].style.backgroundColor = "#00FF80";
			c[0].style.backgroundColor = "#00FF80";
			d[0].style.backgroundColor = "#00FF80";

			if(currentBeat == 0) {
				arrayToSend = samples.filter(function(e) {
					return e.group == 'col1';
				});
			} else if(currentBeat == 1) {
				arrayToSend = samples.filter(function(e) {
					return e.group == 'col2';
				});
			} else if(currentBeat == 2) {
				arrayToSend = samples.filter(function(e) {
					return e.group == 'col3';
				});
			} else if(currentBeat == 3) {
				arrayToSend = samples.filter(function(e) {
					return e.group == 'col4';
				});
			} else if(currentBeat == 4) {
				arrayToSend = samples.filter(function(e) {
					return e.group == 'col5';
				});
			} else if(currentBeat == 5) {
				arrayToSend = samples.filter(function(e) {
					return e.group == 'col6';
				});
			} else if(currentBeat == 6) {
				arrayToSend = samples.filter(function(e) {
					return e.group == 'col7';
				});
			} else if(currentBeat == 7) {
				arrayToSend = samples.filter(function(e) {
					return e.group == 'col8';
				});
			}

			for (var i = 0; i < arrayToSend.length; i++) {
				$scope.playSound(arrayToSend[i]);
			}

			currentBeat++;
			if(currentBeat >= 8) 
				currentBeat = 0;
		}, tempoSet($scope.bpm))};

		$scope.stopTimer = function(){

			var nonCurrentBeats = beatOptions.filter(function(e) {
				return e != currentBeat;
			});

			var x = document.getElementsByClassName(beatCols[currentBeat]);
			var y = document.getElementsByClassName(beatCols[nonCurrentBeats[0]]);
			var w = document.getElementsByClassName(beatCols[nonCurrentBeats[1]]);
			var z = document.getElementsByClassName(beatCols[nonCurrentBeats[2]]);
			var a = document.getElementsByClassName(beatCols[nonCurrentBeats[3]]);
			var b = document.getElementsByClassName(beatCols[nonCurrentBeats[4]]);
			var c = document.getElementsByClassName(beatCols[nonCurrentBeats[5]]);
			var d = document.getElementsByClassName(beatCols[nonCurrentBeats[6]]);

			x[0].style.backgroundColor = "#00FF80";
			y[0].style.backgroundColor = "#00FF80";
			w[0].style.backgroundColor = "#00FF80";
			z[0].style.backgroundColor = "#00FF80";
			a[0].style.backgroundColor = "#00FF80";
			b[0].style.backgroundColor = "#00FF80";
			c[0].style.backgroundColor = "#00FF80";
			d[0].style.backgroundColor = "#00FF80";

			currentBeat = 0;

			clearInterval(refreshInterval);
		};

		$scope.pauseTimer = function() {
			if($scope.paused == false)
				clearInterval(refreshInterval);
			else 
				$scope.startTimer();
		};

		$scope.clearPads = function() {
			for(var i = 0; i < samples.length; i++)
				samples[i].on = false;
		};

		$scope.addBpm = function() {
			$scope.bpm++;
		};

		$scope.subtractBpm = function() {
			$scope.bpm--;
		};

		var tempoSet = function(bpm) {
			return 60000 / (2 * bpm)
		}
	});
})();