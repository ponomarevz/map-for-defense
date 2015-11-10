'use strict'
	angular.module('App').
		controller('panel-instr', function ($scope, $location, routpar) {
			var img = 'images/menu/redact.png';
			var elem = $location.path();
			
			//----------------------иконка для суб меню-------------
			
			var imgList = {'drag':'images/menu/drag.png',
								'rotater':'images/menu/rotate.png',
								'attrib':'images/menu/infr.png',
								'deleter':'images/menu/delete.png'};
			
			$scope.getItem = function() {
				return imgList[routpar.getState()] || img;
			}
			
			$scope.getClass = function(name) {
				var state = routpar.getState();
				if (name == state) {
					return 'active';
				} else
				if (name == 'sub' && imgList[state]) return 'active';
			}
		
		});