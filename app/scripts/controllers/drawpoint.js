'use strict';
	angular.module('App').
		controller('drawpoint', function ($scope, $stateParams, instrServ) {
			
			$scope.model = instrServ.getLocPan().roz;
			$scope.obj = instrServ.getLocPan().obj;
			$scope.select = $stateParams.id || 0;
			
			$scope.isSelItem = function(rozdil) {
				return $scope.select == rozdil; 
			};
						
		})
		.directive('simpleBind', function(instrServ){
			
			
			return {
				restrict : 'A',
				template: "<img title= {{srcTitle}} src = {{sr}}>",
				replace: true,
				scope : {
					srcValue : '=',
					srcTitle : '=',
					srcType : '=',
				},
				link : function(scope, element, attrs) {
					//console.log(scope.srcType);
					
					if (scope.srcType == "svg") {
										
						scope.sr = instrServ.getSvgUrl(scope.srcValue);
						
					} else {
						scope.sr = scope.srcValue;
					}
				}
			}
		})
		