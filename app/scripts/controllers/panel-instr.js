'use strict';
	angular.module('App').
		controller('panel-instr', function ($scope, $stateParams) {
			var img = 'images/menu/redact.png';
					
			//----------------------иконка для суб меню-------------
			
			var imgList = {'drag':'images/menu/drag.png',
								'rottater':'images/menu/rotate.png',
								'attrib':'images/menu/infr.png',
								'deleter':'images/menu/delete.png'};
			//------------ возвращает статус активаци и иконку для активатора субменю-----
			$scope.getItem = function() {
				var it = imgList[$stateParams.state];
				return {
					img:it || img,
					class:false || it
				};
			};
			
			//-------------- проверяет нажата ли кнопка drawpoint нужно для відвижения слайдера
			$scope.isSlideHover = function() {
				
				return $stateParams.state === "drawpoint" ? true : false;
			};
								
		});