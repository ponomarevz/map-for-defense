'use strict';
	
	angular.module('App', ['ui.router']);
	
	angular.module('App').
		controller('main', function ($scope) {
			$scope.item = "sdfsdfs";
			$scope.isAuthenticated	= function() {
				return true;
			};
		});
	
	angular.module('App').
		config(function($stateProvider, $urlRouterProvider, $olMapProvider) {
			
			
		$stateProvider
		.state('navigate.signin', {
				url:'/signin',
				views: {
					'centrV@' : {
						templateUrl:'views/signUp.html',
						controller:'layerswitcher'
					},
				},
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
			.state('navigate.layer', {
				url:'/layer',
				views: {
					'ls@' : {
						templateUrl:'views/layerswitcher.html',
						controller:'layerswitcher'
					},
				},
				onEnter: function($stateParams){
					$stateParams.state="layer";
				}
			})
			.state('navigate.navig', {
				url:'/navig',
				onEnter: function($stateParams){
					$stateParams.state="navig";
				}
			})
			.state('navigate.zp', {
				url:'/zp',
				onEnter: function(){
					
				}
				
			})
			.state('navigate.zm', {
				url:'/zm',
				onEnter: function(){
					
				}
				
			})
			.state('navigate.drawpoint', {
				url:'/drawpoint',
				onEnter: function(){
					
				}
				
			})
			.state('navigate.drawline', {
				url:'/drawline',
				onEnter: function(){
					
				}
				
			})
			.state('navigate.drag', {
				url:'/drag',
				onEnter: function($stateParams){
					 $stateParams.state="drag";
				}
				
			})
			.state('navigate.rotatter', {
				url:'/rotatter',
				onEnter: function($stateParams){
					 $stateParams.state="rottater";
				}
				
			})
			.state('navigate.attrib', {
				url:'/attrib',
				onEnter: function($stateParams){
					 $stateParams.state="attrib";
				}
			})
			.state('navigate.deleter', {
				url:'/deleter',
				onEnter: function($stateParams){
					 $stateParams.state="deleter";
				}
			})
			.state('navigate.inform', {
				url:'/inform',
				onEnter: function(){
					
				}
			})
			.state('navigate.messure', {
				url:'/messure',
				onEnter: function(){
					
				}
			});
				
	});
	
	
	

		