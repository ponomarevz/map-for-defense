'use strict';

angular.module('App')
	.controller('olMapController', function ($scope, $olMap, blInitService, $state, $stateParams) {
		var map = $olMap.map;
		map.addLayers(blInitService);	
			
		function stateChange() {
			var konvert = encodeURI(map.baseLayer.name);
			
			var param = {
				layer:konvert.replace(/%/g, "."),
				zoom: map.getZoom(),
				lon: map.getCenter().lon,
				lat: map.getCenter().lat
			};
			if ($stateParams.state === "navig") { $state.go("navigate.navig", param); }
			if ($stateParams.state === "layer") { $state.go("navigate.layer", param); }
		}
		map.events.on({"moveend": stateChange});
		
});    