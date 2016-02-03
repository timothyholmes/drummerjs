(function() {

	'use strict';

	angular.module('drummerJS')

	.controller('mainCtrl', function($scope, dataManager){

		dataManager.getData('./sounds/kick.json', function(response) {
			$scope.kicks = response.data;
		});

		dataManager.getData('./sounds/snare.json', function(response) {
			$scope.snares = response.data;
		});

		dataManager.getData('./sounds/misc.json', function(response) {
			$scope.miscs = response.data;
		});

	});
})();