(function() {

	'use strict';

	angular.module('drummerJS')

	.controller('MainController', function($scope, dataManager){

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

				var arrayToSend = [];
				var x = document.getElementsByClassName('beatMarker');

				for(var i = 0; i < x.length; i++) {
					x[i].style.backgroundColor = "#00FF80";
				}

				document.getElementsByClassName(beatCols[currentBeat])[0].style.backgroundColor = "#FF0048";

				arrayToSend = samples.filter(function(e) {
					return e.group == beatCols[currentBeat];
				});

				for (var i = 0; i < arrayToSend.length; i++) {
					$scope.playSound(arrayToSend[i]);
				}

				currentBeat++;
				if(currentBeat >= 8) 
					currentBeat = 0;
			}, tempoSet($scope.bpm))
		};

		$scope.stopTimer = function(){
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
		
		var tempoSet = function(bpm) {
			return 60000 / (2 * bpm)
		}
	});
})();