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

		dataManager.getData('./sounds/kick.json', function(response) {
			$scope.kicks = response.data;
		});

		dataManager.getData('./sounds/snare.json', function(response) {
			$scope.snares = response.data;
		});

		dataManager.getData('./sounds/misc.json', function(response) {
			$scope.miscs = response.data;
		});

		$scope.playSound = function(id) {
			if(id <= 4)
				kick.play();
			if(id > 4 && id <= 8)
				snare.play();
			if(id > 8)
				hihat.play();
		};
	});
})();