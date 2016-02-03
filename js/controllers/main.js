(function() {

	'use strict';

	angular.module('drummerJS')

	.controller('mainCtrl', function($scope, dataManager){

		dataManager.getData('./sounds/kick.json', function(response) {
			$scope.sounds = response.data;
			console.log($scope.sounds);
		});

	});
})();