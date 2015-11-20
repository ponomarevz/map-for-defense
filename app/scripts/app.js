'use strict';
	
	angular.module('App', ['ui.router']);
	
	angular.module('App').
		controller('main', function ($scope) {
			$scope.isAuthenticated	= function() {
				return false;
			};
		});
	
	angular.module('App').
		config(function($stateProvider, $urlRouterProvider, $olMapProvider) {
			
			
		$stateProvider
		.state('navigate.search', {
				url:'/serch/:param',
				views: {
					'search@' : {
						template:'<h5>{{init}}</h5>',
						controller: function($scope, res, $olMap) {
							var map = $olMap.map;
							var markers = $olMap.markers;
							$scope.init =  res[0].geometry.location.lng();
							
							var proj = new OpenLayers.Projection("EPSG:4326");
							var point = new OpenLayers.LonLat(res[0].geometry.location.lng(), res[0].geometry.location.lat());
							var	LonLat = point.transform(proj, map.getProjectionObject())
							map.setCenter(LonLat, 15);
							setMarker(markers, LonLat);
							
							function setMarker(MarkL, LonLat){
							MarkL.clearMarkers();
							var size = new OpenLayers.Size(21,25);
							var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
							var icon = new OpenLayers.Icon('img/marker.png', size,offset);
							var marker = new OpenLayers.Marker(LonLat, icon);
							marker.events.register('mousedown', marker, function(evt) {
								alert(address);
								OpenLayers.Event.stop(evt);
							});
							MarkL.addMarker(marker);
						}
						
										
									
							
						}
					},
				},
				resolve: {
					res: function($stateParams, $q) {
						var address=$stateParams.param;
						var geoCoder = new window.google.maps.Geocoder(address);
						var request = { address:$stateParams.param };
						
						var deferred = $q.defer();
						
											//var map = document.getElementById("map");
						geoCoder.geocode(request, function(result, status){
							if (google.maps.GeocoderStatus.OK) {
									if(!result[0]){
										deferred.resolve("За данним запитом відомості відсутні");
									}	 else {
									
										deferred.resolve(result);
										
									}
										
							} else {
								deferred.reject("Google API Geokoder Filed ");
							}	
																		
						});				
						
						
						
						
						return deferred.promise;
						
						
						
					}
				}
		})
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
	
	
	

		