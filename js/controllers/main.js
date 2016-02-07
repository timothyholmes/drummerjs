(function() {

	'use strict';

	angular.module('drummerJS')

	.controller('mainCtrl', function($scope, dataManager){

		var refreshInterval;
		var beatOptions = [0, 1, 2, 3, 4, 5, 6, 7];

		var kick  = new Audio();
		var snare = new Audio();
		var hihat = new Audio();

		var currentBeat = 0;
		var beatCols = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7', 'col8'];

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
		var fifth = [];
		var sixth = [];
		var seventh = [];
		var eighth = [];
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

			$scope.markers = samples.filter(function(e) {
				return e.type == 'marker';
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

			fifth = samples.filter(function(e) {
				return e.group == 'col5';
			});

			sixth = samples.filter(function(e) {
				return e.group == 'col6';
			});

			seventh = samples.filter(function(e) {
				return e.group == 'col7';
			});

			eighth = samples.filter(function(e) {
				return e.group == 'col8';
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
			var a = document.getElementsByClassName(beatCols[nonCurrentBeats[3]]);
			var b = document.getElementsByClassName(beatCols[nonCurrentBeats[4]]);
			var c = document.getElementsByClassName(beatCols[nonCurrentBeats[5]]);
			var d = document.getElementsByClassName(beatCols[nonCurrentBeats[6]]);

			console.log(z);

			for (var i = 0; i < x.length; i++) {
			    x[i].style.backgroundColor = "#F0720C";
			    y[i].style.backgroundColor = "#F0D50C";
			    w[i].style.backgroundColor = "#F0D50C";
			    z[i].style.backgroundColor = "#F0D50C";
			    a[i].style.backgroundColor = "#F0D50C";
			    b[i].style.backgroundColor = "#F0D50C";
			    c[i].style.backgroundColor = "#F0D50C";
			    d[i].style.backgroundColor = "#F0D50C";
			};

			if(currentBeat == 0)
				arrayToSend = first;
			if(currentBeat == 1)
				arrayToSend = second;
			if(currentBeat == 2)
				arrayToSend = third;
			if(currentBeat == 3)
				arrayToSend = fourth;
			if(currentBeat == 4)
				arrayToSend = fifth;
			if(currentBeat == 5)
				arrayToSend = sixth;
			if(currentBeat == 6)
				arrayToSend = seventh;
			if(currentBeat == 7)
				arrayToSend = eighth;

			for (var i = 0; i < arrayToSend.length; i++) {
				$scope.playSound(arrayToSend[i]);
			}

			currentBeat++;
			if(currentBeat >= 8) 
				currentBeat = 0;
		}, 250)};

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

			for (var i = 0; i < x.length; i++) {
			    x[i].style.backgroundColor = "#F0D50C";
			    y[i].style.backgroundColor = "#F0D50C";
			    w[i].style.backgroundColor = "#F0D50C";
			    z[i].style.backgroundColor = "#F0D50C";
			    a[i].style.backgroundColor = "#F0D50C";
			    b[i].style.backgroundColor = "#F0D50C";
			    c[i].style.backgroundColor = "#F0D50C";
			    d[i].style.backgroundColor = "#F0D50C";
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