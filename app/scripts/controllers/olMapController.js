

angular.module('App')
	.controller('NavigationCtrl', function ($scope, $olMap, blInitService, $state) {
		var map = $olMap.map;
		map.addLayers(blInitService);	
			
		map.events.on({"moveend": stateChange}); 
		function stateChange(e) {
			//	router.navigate("navigate/" + map.baseLayer.name + "/" + map.getZoom()+ '/' +  map.getCenter().lon + "/" + map.getCenter().lat);
			var konvert = encodeURI(map.baseLayer.name);
			$state.go("navigate");
			var param = {
				layer: konvert.replace(/%/g, "."),
				zoom: map.getZoom(),
				lon: map.getCenter().lon,
				lat: map.getCenter().lat
			}
			 $state.go("navigate", param); 
		}	
})     