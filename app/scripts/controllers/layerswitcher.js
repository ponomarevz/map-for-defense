'use strict';
angular.module('App')
	.controller('layerswitcher', function ($scope, $olMap, $state) {
		var map = $olMap.map;
		$scope.baselayers = [];
		$scope.temlayers = [];
		var lObj = {};
		
		var len = map.layers.length;
		for (var i=0; i <len; i++) {
            var layer = map.layers[i];
			if (layer.isBaseLayer) {
				lObj = {
					'name': layer.name,
					'visibility': layer.visibility,
					'inRange': layer.inRange,
					'id': layer.id
				};
				if (layer.visibility) { 
					$scope.baseLayerCurentName = layer.name;
				}
				$scope.baselayers.push(lObj); 
			} else {
				$scope.temlayers.push(lObj);
			}
			
        }
		
		$scope.changeBaseLayer = function(name) {
			var konvert = encodeURI(name);
			var param = {
				layer:konvert.replace(/%/g, "."),
				zoom: map.getZoom(),
				lon: map.getCenter().lon,
				lat: map.getCenter().lat
			};
			 $state.go("navigate.layer", param);
		};
		$scope.getClass = function(visible) {
			return !visible || "active1";
		};
		
});