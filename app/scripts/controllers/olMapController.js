

angular.module('App')
	.controller('NavigationCtrl', function ($scope, olMap, blInitService) {
		var map = olMap.map;
		map.addLayers(blInitService);	
		//olMap.olS.maximizeControl();
	
	map.events.on({"moveend": stateChange}); 
	function stateChange(e) {
		//	router.navigate("navigate/" + map.baseLayer.name + "/" + map.getZoom()+ '/' +  map.getCenter().lon + "/" + map.getCenter().lat);
		var konvert = encodeURI(map.baseLayer.name);
		location.hash = "/navigate/" + konvert.replace(/%/g, ".")  + "/" + map.getZoom()+ '/' +  map.getCenter().lon + "/" + map.getCenter().lat;
		
	}	
})     