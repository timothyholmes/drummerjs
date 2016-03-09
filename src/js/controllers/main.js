(function() {

	'use strict';

	angular.module('drummerJS')

	.controller('MainController', function($scope, dataManager){
		dataManager.getData('./components/config/samples.json', function(response) {
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

			$scope.markers = $scope.samples.filter(function(e) {
				return e.type == 'marker';
			});
		});
	});
})();