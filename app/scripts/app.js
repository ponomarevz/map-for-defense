
	angular.module('App', ['ui.router']);
	
	angular.module('App').
		config(function($stateProvider, $urlRouterProvider, $olMapProvider) {
			
			
			
			
		$stateProvider
			.state('layer', {
				url:'/layer',
				//resolve: { title: 'My Contacts' },
				onEnter: function(){
					
					
					$olMapProvider.olS.maximizeControl();
					
				}
				
			})
			.state('navigate', {
				url:'/navigate/:layer/:zoom/:lon/:lat',
				onEnter: function($stateParams){
					var layer = $stateParams.layer;
					layer = decodeURI(layer.replace(/\./g, "%"));
					$olMapProvider.map.moveTo( new OpenLayers.LonLat($stateParams.lon, $stateParams.lat), $stateParams.zoom);
					var l = $olMapProvider.map.getLayersByName(layer)[0];
					$olMapProvider.map.setBaseLayer(l);
					
				}
			})
			.state('zp', {
				url:'/zp',
				onEnter: function(){
					
				}
				
			})
			.state('zm', {
				url:'/zm',
				onEnter: function(){
					
				}
				
			})
			.state('navig', {
				url:'/navig',
				
				
			})
			.state('drawpoint', {
				url:'/drawpoint',
				onEnter: function(){
					
				}
				
			})
			.state('drawline', {
				url:'/drawline',
				onEnter: function(){
					
				}
				
			})
			.state('drag', {
				url:'/drag',
				onEnter: function($stateParams){
					 $stateParams.state="drag";
				}
				
			})
			.state('rotatter', {
				url:'/rotatter',
				onEnter: function($stateParams){
					 $stateParams.state="rottater";
				}
				
			})
			.state('attrib', {
				url:'/attrib',
				onEnter: function($stateParams){
					 $stateParams.state="attrib";
				}
			})
			.state('deleter', {
				url:'/deleter',
				onEnter: function($stateParams){
					 $stateParams.state="deleter";
				}
			})
			.state('inform', {
				url:'/inform',
				onEnter: function(){
					
				}
			})
			.state('messure', {
				url:'/messure',
				onEnter: function(){
					
				}
			})
				
	})
	.controller('NavigationCtrl', function ($scope, $location, routpar) {
		

	});
	

		