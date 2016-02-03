(function() {

	'use strict';

	angular.module('drummerJS')

	.controller('mainCtrl', function($scope, dataManager){

		var kick  = new Audio();
		var snare = new Audio();
		var hihat = new Audio();

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

		$scope.startTimer = function(){setInterval(function(){
			console.log("Start Timer");
		}, 1000)};

		$scope.stopTimer = function(){
			console.log("Stop Timer");
		};
	});
})();