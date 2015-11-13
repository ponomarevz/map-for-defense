'use strict'
	angular.module('App').
		controller('panel-instr', function ($scope, $stateParams) {
			var img = 'images/menu/redact.png';
					
			//----------------------иконка для суб меню-------------
			
			var imgList = {'drag':'images/menu/drag.png',
								'rottater':'images/menu/rotate.png',
								'attrib':'images/menu/infr.png',
								'deleter':'images/menu/delete.png'};
			
			$scope.getItem = function() {
				return imgList[$stateParams.state] || img;
			}
								
		});