'use strict';
	angular.module('App').
		controller('drawpoint', function ($scope, $stateParams, rozdilu) {
			$scope.model = rozdilu.roz;
			$scope.obj = rozdilu.obj;
			$scope.select = $stateParams.id || 0;
			
			$scope.isSelItem = function(rozdil) {
				 return $scope.select == rozdil; 
			};
		
		});
		