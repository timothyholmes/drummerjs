(function() {

	'use strict';

	angular.module('drummerJS')

	.controller('mainCtrl', function($scope, dataManager){

		var refreshInterval;
		var beatOptions = [0, 1, 2, 3];

		var kick  = new Audio();
		var snare = new Audio();
		var hihat = new Audio();

		var currentBeat = 0;
		var beatCols = ['col1', 'col2', 'col3', 'col4'];

		var sound1 = {
			"id": "3",
			"sound": "./assets/sounds/kick.mp3",
			"type": "kick",
			"on": true,
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
		var samples = [];

		dataManager.getData('./sounds/samples.json', function(response) {
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

			first = samples.filter(function(e) {
				return e.group == 'col1';
			});

			second = samples.filter(function(e) {
				return e.group == 'col2';
			});

			third = samples.filter(function(e) {
				return e.group == 'col3';
			});

			fourth = samples.filter(function(e) {
				return e.group == 'col4';
			});
		});

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

			refreshInterval = setInterval(function(){

			var arrayToSend;

			var nonCurrentBeats = beatOptions.filter(function(e) {
				return e != currentBeat;
			});

			var x = document.getElementsByClassName(beatCols[currentBeat]);
			var y = document.getElementsByClassName(beatCols[nonCurrentBeats[0]]);
			var w = document.getElementsByClassName(beatCols[nonCurrentBeats[1]]);
			var z = document.getElementsByClassName(beatCols[nonCurrentBeats[2]]);

			for (var i = 0; i < x.length; i++) {
			    x[i].style.backgroundColor = "#F0720C";
			    y[i].style.backgroundColor = "#F0D50C";
			    w[i].style.backgroundColor = "#F0D50C";
			    z[i].style.backgroundColor = "#F0D50C";
			};

			if(currentBeat == 0)
				arrayToSend = first;
			if(currentBeat == 1)
				arrayToSend = second;
			if(currentBeat == 2)
				arrayToSend = third;
			if(currentBeat == 3)
				arrayToSend = fourth;

			for (var i = 0; i < arrayToSend.length; i++) {
				$scope.playSound(arrayToSend[i]);
			}

			currentBeat++;
			if(currentBeat >= 4) 
				currentBeat = 0;
		}, 500)};

		$scope.stopTimer = function(){

			var nonCurrentBeats = beatOptions.filter(function(e) {
				return e != currentBeat;
			});

			var x = document.getElementsByClassName(beatCols[currentBeat]);
			var y = document.getElementsByClassName(beatCols[nonCurrentBeats[0]]);
			var w = document.getElementsByClassName(beatCols[nonCurrentBeats[1]]);
			var z = document.getElementsByClassName(beatCols[nonCurrentBeats[2]]);

			for (var i = 0; i < x.length; i++) {
			    x[i].style.backgroundColor = "#F0D50C";
			    y[i].style.backgroundColor = "#F0D50C";
			    w[i].style.backgroundColor = "#F0D50C";
			    z[i].style.backgroundColor = "#F0D50C";
			};

			currentBeat = 0;

			clearInterval(refreshInterval);
		};

		$scope.clearPads = function() {
			for(var i = 0; i < samples.length; i++)
				samples[i].on = false;
		};
	});
})();