(function() {

	'use strict';

	angular.module('drummerJS')

	.controller('mainCtrl', function($scope, dataManager){

		var refreshInterval;

		var kick  = new Audio();
		var snare = new Audio();
		var hihat = new Audio();

		var currentBeat = 0;
		var beatCols = ['col1', 'col2', 'col3', 'col4'];

		var sound1 = {
			"id": "3",
			"sound": "./assets/sounds/kick.mp3",
			"type": "kick",
			"group": "col3"
		};

		var sound2 = {
			"id": "3",
			"sound": "./assets/sounds/kick.mp3",
			"type": "snare",
			"group": "col3"
		};

		$scope.groupOneLight = false;
		$scope.groupTwoLight = false;
		$scope.groupThreeLight = false;
		$scope.groupFourLight = false;

		kick.src  = "./assets/sounds/kick.mp3";
		snare.src = "./assets/sounds/snare.mp3";
		hihat.src = "./assets/sounds/hihat.mp3";

		var first = [];
		var second = [];
		var third = [];
		var fourth = [];

		dataManager.getData('./sounds/samples.json', function(response) {
			$scope.samples = response.data;

			$scope.kicks = $scope.samples.filter(function(e) {
				return e.type == 'kick';
			});

			$scope.snares = $scope.samples.filter(function(e) {
				return e.type == 'snare';
			});

			$scope.hihats = $scope.samples.filter(function(e) {
				return e.type == 'hihat';
			});
		});

		$scope.playSound = function(sound) {
			if(sound.type == 'kick')
				kick.play();
			if(sound.type == 'snare')
				snare.play();
			if(sound.type == 'hihat')
				hihat.play();
		};

		$scope.getClass = function(ele) {
			return ele.group;
		};

		$scope.startTimer = function() {

			refreshInterval = setInterval(function(){
			var nonCurrentBeats = beatCols.filter(function(e) {
				return e != beatCols[currentBeat];
			});

			var x = document.getElementsByClassName(beatCols[currentBeat]);
			var y = document.getElementsByClassName(beatCols[nonCurrentBeats[0]]);
			var w = document.getElementsByClassName(beatCols[nonCurrentBeats[1]]);
			var z = document.getElementsByClassName(beatCols[nonCurrentBeats[2]]);

			console.log(y);
			console.log(z);
			console.log(w);

			for (var i = 0; i < x.length; i++) {
			    x[i].style.backgroundColor = "red";
			};

			if(currentBeat == 0 || currentBeat == 2)
				$scope.playSound(sound1);
			if(currentBeat == 1 || currentBeat == 3)
				$scope.playSound(sound2);

			currentBeat++;
			if(currentBeat >= 4) 
				currentBeat = 0;
		}, 1000)};

		$scope.stopTimer = function(){
			console.log("Stop Timer");
			clearInterval(refreshInterval);
		};
	});
})();