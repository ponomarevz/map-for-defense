'use strict'
angular.module('App')
	.controller('layerswitcher', function ($scope, $olMap, $state) {
		var map = $olMap.map;
		$scope.par = {};
		$scope.par.baseLayerName;
		$scope.par.baseLayerCurentName;
		$scope.par.baselayers = [];
		$scope.par.temlayers = [];
		var len = map.layers.length;
		for (var i=0; i <len; i++) {
            var layer = map.layers[i];
			if (layer.isBaseLayer) {
				if (layer.visibility) { $scope.par.baseLayerCurentName = layer.name;}
				$scope.par.baselayers.push({
					'name': layer.name,
					'visibility': layer.visibility,
					'inRange': layer.inRange,
					'id': layer.id
				}); 
			} else {
				$scope.par.temlayers.push({
					'name': layer.name,
					'visibility': layer.visibility,
					'inRange': layer.inRange,
					'id': layer.id
				});
			}
			
        }
		$scope.changeBaseLayer = function(name) {
						
			var konvert = encodeURI(name);
			
			var param = {
				layer:konvert.replace(/%/g, "."),
				zoom: map.getZoom(),
				lon: map.getCenter().lon,
				lat: map.getCenter().lat
			}
			 $state.go("navigate.layer", param);
			
		}
		
			
})     