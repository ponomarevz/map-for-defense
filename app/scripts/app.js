'use strict';
	
	angular.module('App', ['ui.router', 'ngAnimate']);
	
	angular.module('App').
		controller('main', function ($scope, instrServ) {
			$scope.isAuthenticated	= function() {
				return false;
			};
			instrServ.getInstr().then(function(res){
				alert(res);
			});
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
							var icon = new OpenLayers.Icon('images/menu/marker.png', size,offset);
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
				url:'/drawpoint/:id',
				views: { //----------потом можна перенести на линию сделаю креатив на линии
					'menuCont@' : {
						templateUrl:'views/Point.html',
						controller:'drawpoint'
					}
					
				},
				resolve: {
					rozdilu: function($q) {
						//----------сделанно временно заглушка без сервера
						//var a = {"contents_rozdil": [{"id_rozdil":1,"rozdil_title":"Пункти управління"},{"id_rozdil":2,"rozdil_title":"Установи Державної влади"},{"id_rozdil":3,"rozdil_title":"Підрозділи суміжних Держав"},{"id_rozdil":4,"rozdil_title":"Елементи ОСД"},{"id_rozdil":5,"rozdil_title":"Прикордонна авіація"},{"id_rozdil":6,"rozdil_title":"Озброєння і техніка"}],"contents_obj":[{"id_obj":105,"obj_title":"Пункт управління органу охорони державного кордону","id_rozdil":1,"obj_src":" images/instrument/1422257900.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":106,"obj_title":"Пункт управління органу охорони державного кордону","id_rozdil":1,"obj_src":" images/instrument/1422258007.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":107,"obj_title":"Пункт управління окремого контрольно-пропускного пункту","id_rozdil":1,"obj_src":" images/instrument/1422258067.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":109,"obj_title":"Пункт управління окремого контрольно-пропускного пункту","id_rozdil":1,"obj_src":" images/instrument/1422258521.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":110,"obj_title":"Пункт  управління окремого дивізіону кораблів Морської охорони","id_rozdil":1,"obj_src":" images/instrument/1422259925.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":111,"obj_title":"Пункт  управління окремого дивізіону кораблів Морської охорони","id_rozdil":1,"obj_src":" images/instrument/1422259941.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":112,"obj_title":"Пункт управління відділу прикордонної служби","id_rozdil":1,"obj_src":" images/instrument/1422259984.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":113,"obj_title":"Пункт управління відділу прикордонної служби","id_rozdil":1,"obj_src":" images/instrument/1422259999.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":114,"obj_title":"Пункт управління  прикордонної застави","id_rozdil":1,"obj_src":" images/instrument/1422260045.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":115,"obj_title":"Пункт управління  прикордонної застави","id_rozdil":1,"obj_src":" images/instrument/1422260068.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":116,"obj_title":"Контролерський пост","id_rozdil":1,"obj_src":" images/instrument/1422260125.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":117,"obj_title":"Контролерський пост","id_rozdil":1,"obj_src":" images/instrument/1422260143.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":118,"obj_title":"Прикордонний пост","id_rozdil":1,"obj_src":" images/instrument/1422260190.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":119,"obj_title":"Прикордонний пост","id_rozdil":1,"obj_src":" images/instrument/1422260204.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":120,"obj_title":"Інспекторський пост","id_rozdil":1,"obj_src":" images/instrument/1422260382.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":121,"obj_title":"Інспекторський пост","id_rozdil":1,"obj_src":" images/instrument/1422260399.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":122,"obj_title":"Тимчасовий прикордонний пост","id_rozdil":1,"obj_src":" images/instrument/1422260437.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":123,"obj_title":"Тимчасовий прикордонний пост","id_rozdil":1,"obj_src":" images/instrument/1422260446.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":124,"obj_title":"Районний відділ СБ","id_rozdil":1,"obj_src":" images/instrument/1422260481.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":125,"obj_title":"Районний відділ СБ","id_rozdil":1,"obj_src":" images/instrument/1422260492.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":126,"obj_title":"Митниця","id_rozdil":1,"obj_src":" images/instrument/1422260516.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":127,"obj_title":"Митниця","id_rozdil":1,"obj_src":" images/instrument/1422260526.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":128,"obj_title":"Обласна рада","id_rozdil":2,"obj_src":" images/instrument/1422267032.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":129,"obj_title":"Обласна рада","id_rozdil":2,"obj_src":" images/instrument/1422267044.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":130,"obj_title":"Районна рада","id_rozdil":2,"obj_src":" images/instrument/1422267069.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":131,"obj_title":"Районна рада","id_rozdil":2,"obj_src":" images/instrument/1422268228.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":132,"obj_title":"Сільська (селищна) рада","id_rozdil":2,"obj_src":" images/instrument/1422268253.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":133,"obj_title":"Сільська (селищна) рада","id_rozdil":2,"obj_src":" images/instrument/1422268264.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":134,"obj_title":"Обласна державна адміністрація","id_rozdil":2,"obj_src":" images/instrument/1422268527.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":135,"obj_title":"Обласна державна адміністрація","id_rozdil":2,"obj_src":" images/instrument/1422268541.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":136,"obj_title":"Районна державна адміністрація","id_rozdil":2,"obj_src":" images/instrument/1422268565.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":137,"obj_title":"Районна державна адміністрація","id_rozdil":2,"obj_src":" images/instrument/1422268575.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":163,"obj_title":"Резиденція прикордонного  уповноваженого (представника)","id_rozdil":3,"obj_src":" images/instrument/1422356114.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":164,"obj_title":"Резиденція прикордонного  уповноваженого (представника)","id_rozdil":3,"obj_src":" images/instrument/1422356145.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":165,"obj_title":"Резиденція заступника (помічника) прикордонного уповноваженого (представника)","id_rozdil":3,"obj_src":" images/instrument/1422356187.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":166,"obj_title":"Резиденція заступника (помічника) прикордонного уповноваженого (представника)","id_rozdil":3,"obj_src":" images/instrument/1422356201.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":167,"obj_title":"Орган охорони кордону","id_rozdil":3,"obj_src":" images/instrument/1422356236.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":168,"obj_title":"Орган охорони кордону","id_rozdil":3,"obj_src":" images/instrument/1422356247.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":169,"obj_title":"Регіональний орган управління","id_rozdil":3,"obj_src":" images/instrument/1422356280.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":170,"obj_title":"Регіональний орган управління","id_rozdil":3,"obj_src":" images/instrument/1422356297.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":171,"obj_title":"Підрозділ прикордонного (імміграційного, паспортного) контролю","id_rozdil":3,"obj_src":" images/instrument/1422356338.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":172,"obj_title":"Підрозділ прикордонного (імміграційного, паспортного) контролю","id_rozdil":3,"obj_src":" images/instrument/1422356349.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":173,"obj_title":"Прикордонний пост","id_rozdil":3,"obj_src":" images/instrument/1422356396.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":174,"obj_title":"Прикордонний пост","id_rozdil":3,"obj_src":" images/instrument/1422356422.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":175,"obj_title":"Підрозділ охорони кордону","id_rozdil":3,"obj_src":" images/instrument/1422356453.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":176,"obj_title":"Підрозділ охорони кордону","id_rozdil":3,"obj_src":" images/instrument/1422356463.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":177,"obj_title":"Радіотехнічний пост впс","id_rozdil":1,"obj_src":" images/instrument/1422358875.png","obj_type":"png","obj_position":0,"obj_rotate":1},{"id_obj":197,"obj_title":"rewew","id_rozdil":6,"obj_src":"<svg width=№40№ height=№40№ xmlns:xlink=№http://www.w3.org/1999/xlink№ xmlns=№http://www.w3.org/2000/svg№><g><line stroke-width=№null№ fill=№none№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_3№ y2=№37.27987№ x2=№6.6195№ y1=№2.61006№ x1=№6.6195№/><line stroke-width=№null№ fill=№none№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_4№ y2=№14.16667№ x2=№37.27988№ y1=№3.08176№ x1=№6.85535№/><line stroke-width=№null№ fill=№none№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_5№ y2=№27.61006№ x2=№6.6195№ y1=№14.16667№ x1=№36.80818№/><line stroke-width=№null№ fill=№none№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_6№ y2=№33.03459№ x2=№37.04403№ y1=№32.79874№ x1=№14.40252№/><line stroke-width=№null№ fill=№none№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_7№ y2=№27.13836№ x2=№26.66667№ y1=№33.03459№ x1=№36.80818№/><line stroke-width=№null№ fill=№none№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_8№ y2=№38.93082№ x2=№26.19497№ y1=№32.79874№ x1=№36.33648№/><ellipse ry=№3.77358№ rx=№4.24528№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ fill=№none№ id=№svg_9№ cy=№14.87421№ cx=№15.81761№/><ellipse ry=№3.30189№ rx=№2.35849№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ fill=№none№ id=№svg_10№ cy=№3.76572№ cx=№25.93554№/><ellipse ry=№3.06604№ rx=№3.53774№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ fill=№none№ id=№svg_11№ cy=№20.9827№ cx=№29.00157№/></g></svg>","obj_type":"svg","obj_position":0,"obj_rotate":0},{"id_obj":200,"obj_title":"qwe","id_rozdil":6,"obj_src":"<svg width=№40№ height=№40№ xmlns:xlink=№http://www.w3.org/1999/xlink№ xmlns=№http://www.w3.org/2000/svg№ ><g><line fill=№none№ stroke=№#ff0000№ id=№svg_1№ y2=№6.633333№ x2=№22.820835№ y1=№6.508333№ x1=№3.320835№/><line fill=№none№ stroke=№#ff0000№ id=№svg_2№ y2=№16.633333№ x2=№30.695835№ y1=№6.633333№ x1=№22.820835№/><line fill=№none№ stroke=№#ff0000№ id=№svg_3№ y2=№23.883333№ x2=№20.195835№ y1=№16.633333№ x1=№30.695835№/><line fill=№none№ stroke=№#ff0000№ id=№svg_4№ y2=№24.008333№ x2=№3.070835№ y1=№23.883333№ x1=№20.195835№/><line fill=№none№ stroke=№#ff0000№ id=№svg_5№ y2=№6.008333№ x2=№3.070835№ y1=№24.008333№ x1=№3.195835№/><line fill=№none№ stroke=№#ff0000№ id=№svg_6№ y2=№24.008333№ x2=№7.945835№ y1=№6.508333№ x1=№7.695835№/><line fill=№none№ stroke=№#ff0000№ id=№svg_7№ y2=№24.258333№ x2=№9.820835№ y1=№6.633333№ x1=№9.570835№/></g></svg>","obj_type":"svg","obj_position":0,"obj_rotate":0},{"id_obj":201,"obj_title":"fdsaads","id_rozdil":6,"obj_src":"<svg width=№40№ height=№40№ xmlns:xlink=№http://www.w3.org/1999/xlink№ xmlns=№http://www.w3.org/2000/svg№ ><g><title>Layer 1</title><ellipse ry=№14.3125№ rx=№14.312499№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ fill=№none№ id=№svg_9№ cy=№17.570835№ cx=№18.008335№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_11№ y2=№22.758333№ x2=№12.570835№ y1=№1.258333№ x1=№12.445835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_12№ y2=№17.508333№ x2=№15.195835№ y1=№22.633333№ x1=№12.695835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_13№ y2=№18.258333№ x2=№9.570835№ y1=№22.633333№ x1=№12.570835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_14№ y2=№14.258333№ x2=№23.070835№ y1=№34.508333№ x1=№23.570835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_15№ y2=№19.133333№ x2=№20.695835№ y1=№14.258333№ x1=№23.070835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_16№ y2=№18.883333№ x2=№25.695835№ y1=№14.133333№ x1=№23.195835№/></g></svg>","obj_type":"svg","obj_position":0,"obj_rotate":0},{"id_obj":202,"obj_title":"dASDa","id_rozdil":6,"obj_src":"<svg width=№40№ height=№40№ xmlns:xlink=№http://www.w3.org/1999/xlink№ xmlns=№http://www.w3.org/2000/svg№ ><g><title>Layer 1</title><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_11№ y2=№22.758333№ x2=№12.570835№ y1=№1.258333№ x1=№12.445835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_12№ y2=№17.508333№ x2=№15.195835№ y1=№22.633333№ x1=№12.695835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_13№ y2=№18.258333№ x2=№9.570835№ y1=№22.633333№ x1=№12.570835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_14№ y2=№14.258333№ x2=№23.070835№ y1=№34.508333№ x1=№23.570835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_15№ y2=№19.133333№ x2=№20.695835№ y1=№14.258333№ x1=№23.070835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_16№ y2=№18.883333№ x2=№25.695835№ y1=№14.133333№ x1=№23.195835№/><rect stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ fill=№none№ id=№svg_17№ height=№22.75№ width=№23.5№ y=№6.633333№ x=№6.570835№/></g></svg>","obj_type":"svg","obj_position":0,"obj_rotate":0},{"id_obj":203,"obj_title":"ghdfgh","id_rozdil":6,"obj_src":"<svg width=№40№ height=№40№ xmlns:xlink=№http://www.w3.org/1999/xlink№ xmlns=№http://www.w3.org/2000/svg№ ><g><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_17№ y2=№31.008333№ x2=№2.445835№ y1=№5.383333№ x1=№17.445835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_18№ y2=№30.508333№ x2=№32.695835№ y1=№30.633333№ x1=№2.570835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_19№ y2=№5.508333№ x2=№16.945835№ y1=№30.508333№ x1=№32.695835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_20№ y2=№27.008333№ x2=№12.445835№ y1=№5.133333№ x1=№12.445835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_21№ y2=№21.883333№ x2=№15.320835№ y1=№26.758333№ x1=№12.570835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_22№ y2=№22.633333№ x2=№9.445835№ y1=№26.633333№ x1=№12.195835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_23№ y2=№20.633333№ x2=№22.445835№ y1=№33.633333№ x1=№22.445835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_24№ y2=№25.133333№ x2=№19.820835№ y1=№20.633333№ x1=№22.320835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_25№ y2=№25.383333№ x2=№25.570835№ y1=№20.633333№ x1=№22.820835№/></g></svg>","obj_type":"svg","obj_position":0,"obj_rotate":0},{"id_obj":207,"obj_title":"dqweq","id_rozdil":6,"obj_src":"<svg width=№40№ height=№40№ xmlns:xlink=№http://www.w3.org/1999/xlink№ xmlns=№http://www.w3.org/2000/svg№ ><g><title>Layer 1</title><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_25№ y2=№22.883333№ x2=№28.195835№ y1=№5.258333№ x1=№3.695835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_26№ y2=№6.133333№ x2=№28.445835№ y1=№22.508333№ x1=№2.320835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_27№ y2=№30.008333№ x2=№15.570835№ y1=№14.133333№ x1=№15.570835№/></g></svg>","obj_type":"svg","obj_position":0,"obj_rotate":0},{"id_obj":208,"obj_title":"віффі","id_rozdil":6,"obj_src":"<svg width=№40№ height=№40№ xmlns:xlink=№http://www.w3.org/1999/xlink№ xmlns=№http://www.w3.org/2000/svg№ > <g><ellipse ry=№4.125№ rx=№4.125№ stroke-width=№0№ stroke=№#ff0000№ fill=№#FF0000№ id=№svg_1№ cy=№8.3375№ cx=№10.275№/>  <ellipse ry=№3.5№ rx=№4.625№ stroke-dasharray=№null№ stroke-width=№0№ stroke=№#ff0000№ fill=№#ffffff№ id=№svg_2№ cy=№8.9625№ cx=№15.525№/>  <line fill=№none№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_3№ y2=№12.2125№ x2=№9.525№ y1=№26.5875№ x1=№9.525№/>  <line fill=№none№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_4№ y2=№21.0875№ x2=№13.775№ y1=№26.2125№ x1=№9.525№/>  <line fill=№none№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_5№ y2=№20.9625№ x2=№5.9№ y1=№25.8375№ x1=№9.525№/>  <line fill=№none№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_6№ y2=№4.7125№ x2=№26.4№ y1=№9.3375№ x1=№20.025№/>  <line fill=№none№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_7№ y2=№4.0875№ x2=№22.025№ y1=№4.8375№ x1=№26.025№/>  <line fill=№none№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_8№ y2=№8.3375№ x2=№25.025№ y1=№5.2125№ x1=№25.65№/></g></svg>","obj_type":"svg","obj_position":0,"obj_rotate":0},{"id_obj":209,"obj_title":"пункт пропуску 1","id_rozdil":5,"obj_src":"<svg width=№40№ height=№40№ xmlns:xlink=№http://www.w3.org/1999/xlink№ xmlns=№http://www.w3.org/2000/svg№ ><g><title>Layer 1</title><ellipse ry=№14.3125№ rx=№14.312499№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ fill=№none№ id=№svg_9№ cy=№17.570835№ cx=№18.008335№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_11№ y2=№22.758333№ x2=№12.570835№ y1=№1.258333№ x1=№12.445835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_12№ y2=№17.508333№ x2=№15.195835№ y1=№22.633333№ x1=№12.695835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_13№ y2=№18.258333№ x2=№9.570835№ y1=№22.633333№ x1=№12.570835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_14№ y2=№14.258333№ x2=№23.070835№ y1=№34.508333№ x1=№23.570835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_15№ y2=№19.133333№ x2=№20.695835№ y1=№14.258333№ x1=№23.070835№/><line fill=№none№ stroke-dasharray=№null№ stroke-width=№null№ stroke=№#ff0000№ id=№svg_16№ y2=№18.883333№ x2=№25.695835№ y1=№14.133333№ x1=№23.195835№/></g></svg>","obj_type":"svg","obj_position":0,"obj_rotate":0},{"id_obj":210,"obj_title":"іваіваів111","id_rozdil":6,"obj_src":"<svg width=№40№ height=№40№ xmlns:xlink=№http://www.w3.org/1999/xlink№ xmlns=№http://www.w3.org/2000/svg№>  <g>   <title>Layer 1</title>   <line fill=№none№ stroke-opacity=№null№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_4№ y2=№27.125№ x2=№23.5№ y1=№10.25№ x1=№3.625№/>   <line fill=№none№ stroke-opacity=№null№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_5№ y2=№12.625№ x2=№36.75№ y1=№27.125№ x1=№23.5№/>   <line fill=№none№ stroke-opacity=№null№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_6№ y2=№5.25№ x2=№27.25№ y1=№12.625№ x1=№36.75№/>   <line fill=№none№ stroke-opacity=№null№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_7№ y2=№37.0625№ x2=№5.0625№ y1=№5.25№ x1=№27.25№/>   <line fill=№none№ stroke-opacity=№null№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_8№ y2=№37.9375№ x2=№36.1875№ y1=№37.0625№ x1=№5.0625№/>   <line fill=№none№ stroke-opacity=№null№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_9№ y2=№33№ x2=№27.1875№ y1=№37.875№ x1=№36.1875№/>   <line fill=№none№ stroke-opacity=№null№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_10№ y2=№38.5625№ x2=№9.75№ y1=№34.6875№ x1=№15.0625№/>   <line fill=№none№ stroke-opacity=№null№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_11№ y2=№38.6875№ x2=№12.375№ y1=№35.4375№ x1=№19.5№/>   <line fill=№none№ stroke-opacity=№null№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_12№ y2=№19.4375№ x2=№2.625№ y1=№10.5625№ x1=№10.9375№/>   <line fill=№none№ stroke-opacity=№null№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_13№ y2=№21.5625№ x2=№4.3125№ y1=№12.8125№ x1=№12.875№/>  </g> </svg>","obj_type":"svg","obj_position":0,"obj_rotate":0},{"id_obj":212,"obj_title":"привнт","id_rozdil":6,"obj_src":"<svg width=№40№ height=№40№ xmlns:xlink=№http://www.w3.org/1999/xlink№ xmlns=№http://www.w3.org/2000/svg№>  <g>   <line  stroke-width=№null№ fill=№none№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_1№ y2=№38.375№ x2=№3.9375№ y1=№1.625№ x1=№3.6875№/>   <line fill=№none№ stroke-dasharray=№null№  stroke-width=№null№ stroke=№#ff0000№ id=№svg_2№ y2=№13.375№ x2=№34.3125№ y1=№2№ x1=№3.6875№/>   <line fill=№none№ stroke-dasharray=№null№  stroke-width=№null№ stroke=№#ff0000№ id=№svg_3№ y2=№24.875№ x2=№4.0625№ y1=№13.25№ x1=№33.9375№/>  </g> </svg>","obj_type":"svg","obj_position":2,"obj_rotate":0},{"id_obj":213,"obj_title":"тактична група","id_rozdil":6,"obj_src":" <svg width=№40№ height=№40№ xmlns:xlink=№http://www.w3.org/1999/xlink№ xmlns=№http://www.w3.org/2000/svg№>  <g>  <line stroke-width=№null№ fill=№none№ stroke=№#ff0000№ id=№svg_1№ y2=№22.39083№ x2=№5.13469№ y1=№7.41408№ x1=№21.50678№/>   <line stroke-width=№null№ fill=№none№ stroke=№#ff0000№ id=№svg_2№ y2=№37.0885№ x2=№21.27422№ y1=№21.8792№ x1=№5.36725№/>   <line stroke-width=№null№ fill=№none№ stroke=№#ff0000№ id=№svg_3№ y2=№22.6699№ x2=№37.1812№ y1=№36.6699№ x1=№21.13469№/>   <line stroke-width=№null№ fill=№none№ stroke=№#ff0000№ id=№svg_4№ y2=№7.41408№ x2=№21.08818№ y1=№22.71641№ x1=№36.94864№/>   <line stroke-width=№null№ fill=№none№ stroke=№#ff0000№ id=№svg_5№ y2=№6.01873№ x2=№34.3905№ y1=№24.34431№ x1=№20.34399№/>   <line stroke-width=№null№ fill=№none№ stroke=№#ff0000№ id=№svg_6№ y2=№7.64664№ x2=№27.69283№ y1=№6.06525№ x1=№34.15794№/>   <line stroke-width=№null№ fill=№none№ stroke=№#ff0000№ id=№svg_7№ y2=№11.64664№ x2=№34.80911№ y1=№6.11176№ x1=№34.29748№/>   <line stroke-width=№null№ fill=№none№ stroke=№#ff0000№ id=№svg_8№ y2=№5.55362№ x2=№6.3905№ y1=№24.11176№ x1=№20.48353№/>   <line stroke-width=№null№ fill=№none№ stroke=№#ff0000№ id=№svg_9№ y2=№9.83269№ x2=№5.55329№ y1=№5.55362№ x1=№6.3905№/>   <line stroke-width=№null№ fill=№none№ stroke=№#ff0000№ id=№svg_10№ y2=№5.83269№ x2=№16.66957№ y1=№5.27455№ x1=№6.71608№/>  </g> </svg>","obj_type":"svg","obj_position":2,"obj_rotate":0},{"id_obj":214,"obj_title":"fdsaadstewte","id_rozdil":5,"obj_src":" tewtew","obj_type":"svg","obj_position":0,"obj_rotate":0},{"id_obj":215,"obj_title":"22","id_rozdil":5,"obj_src":"11222222222222222222","obj_type":"svg","obj_position":1,"obj_rotate":0},{"id_obj":216,"obj_title":"Машина","id_rozdil":6,"obj_src":" <svg width=№40№ height=№40№ xmlns:xlink=№http://www.w3.org/1999/xlink№ xmlns=№http://www.w3.org/2000/svg№><g><path stroke-width=№null№ stroke=№#ff0000№ fill=№#ffffff№ id=№svg_1№ d=№m4.54948,9.30218l-0.05007,23.69782l31.75059,-0.28443l-0.32552,-10.41696l-13.5,0.375l0.05867,-13.42361l-17.93367,0.05218z№/>  </g> </svg>","obj_type":"svg","obj_position":0,"obj_rotate":0},{"id_obj":217,"obj_title":"gggg","id_rozdil":6,"obj_src":" <svg width=№40№ height=№40№ xmlns:xlink=№http://www.w3.org/1999/xlink№ xmlns=№http://www.w3.org/2000/svg№> <g>    <path stroke=№#ff0000№  stroke-width=№null№ fill=№#ffffff№ id=№svg_1№ d=№m4.54948,9.30218l-0.05007,23.69782l31.75059,-0.28443l-0.32552,-10.41696l-13.5,0.375l0.05867,-13.42361l-17.93367,0.05218z№/>   <line fill=№none№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_2№ y2=№8.79861№ x2=№13.29948№ y1=№2.92361№ x1=№8.67448№/>   <line fill=№none№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_3№ y2=№2.17361№ x2=№18.79948№ y1=№8.67361№ x1=№13.04948№/>   <line fill=№none№ stroke-dasharray=№null№ stroke=№#ff0000№ id=№svg_4№ y2=№14.67361№ x2=№29.42448№ y1=№14.67361№ x1=№22.54948№/>  </g> </svg>","obj_type":"svg","obj_position":0,"obj_rotate":0},{"id_obj":218,"obj_title":"радіостанція","id_rozdil":6,"obj_src":" <svg width=№45№ height=№45№ xmlns:xlink=№http://www.w3.org/1999/xlink№ xmlns=№http://www.w3.org/2000/svg№>  <!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->  <g>   <title>Layer 1</title>   <line fill=№none№ stroke=№#ff0000№ id=№svg_1№ y2=№41.625№ x2=№4.1875№ y1=№10.375№ x1=№20.3125№/>   <line fill=№none№ stroke=№#ff0000№ id=№svg_2№ y2=№41.125№ x2=№40.8125№ y1=№41.375№ x1=№4.3125№/>   <line fill=№none№ stroke=№#ff0000№ id=№svg_3№ y2=№10.75№ x2=№20.3125№ y1=№41.125№ x1=№40.8125№/>   <line fill=№none№ stroke=№#ff0000№ id=№svg_4№ y2=№2.375№ x2=№25.8125№ y1=№10.875№ x1=№20.3125№/>   <line fill=№none№ stroke=№#ff0000№ id=№svg_5№ y2=№15.75№ x2=№26.1875№ y1=№2.375№ x1=№25.8125№/>   <line fill=№none№ stroke=№#ff0000№ id=№svg_6№ y2=№3.5№ x2=№37.5625№ y1=№15.75№ x1=№26.1875№/>   <line fill=№none№ stroke=№#ff0000№ id=№svg_7№ y2=№4.875№ x2=№30.5625№ y1=№3.5№ x1=№37.5625№/>   <line fill=№none№ stroke=№#ff0000№ id=№svg_8№ y2=№9.625№ x2=№36.6875№ y1=№3.5№ x1=№37.4375№/>  </g> </svg>","obj_type":"svg","obj_position":0,"obj_rotate":0}],"id_last":218};
						var a = {"contents_rozdil": [{"id_rozdil":1,"rozdil_title":"Пункти управління"},{"id_rozdil":2,"rozdil_title":"Установи Державної влади"},{"id_rozdil":3,"rozdil_title":"Підрозділи суміжних Держав"},{"id_rozdil":4,"rozdil_title":"Елементи ОСД"},{"id_rozdil":5,"rozdil_title":"Прикордонна авіація"},{"id_rozdil":6,"rozdil_title":"Озброєння і техніка"}],"contents_obj":[{"id_obj":105,"obj_title":"Пункт управління органу охорони державного кордону","id_rozdil":1,"obj_src":" images/instrument/1422257900.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":106,"obj_title":"Пункт управління органу охорони державного кордону","id_rozdil":1,"obj_src":" images/instrument/1422258007.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":107,"obj_title":"Пункт управління окремого контрольно-пропускного пункту","id_rozdil":1,"obj_src":" images/instrument/1422258067.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":109,"obj_title":"Пункт управління окремого контрольно-пропускного пункту","id_rozdil":1,"obj_src":" images/instrument/1422258521.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":110,"obj_title":"Пункт  управління окремого дивізіону кораблів Морської охорони","id_rozdil":1,"obj_src":" images/instrument/1422259925.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":111,"obj_title":"Пункт  управління окремого дивізіону кораблів Морської охорони","id_rozdil":1,"obj_src":" images/instrument/1422259941.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":112,"obj_title":"Пункт управління відділу прикордонної служби","id_rozdil":1,"obj_src":" images/instrument/1422259984.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":113,"obj_title":"Пункт управління відділу прикордонної служби","id_rozdil":1,"obj_src":" images/instrument/1422259999.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":114,"obj_title":"Пункт управління  прикордонної застави","id_rozdil":1,"obj_src":" images/instrument/1422260045.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":115,"obj_title":"Пункт управління  прикордонної застави","id_rozdil":1,"obj_src":" images/instrument/1422260068.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":116,"obj_title":"Контролерський пост","id_rozdil":1,"obj_src":" images/instrument/1422260125.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":117,"obj_title":"Контролерський пост","id_rozdil":1,"obj_src":" images/instrument/1422260143.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":118,"obj_title":"Прикордонний пост","id_rozdil":1,"obj_src":" images/instrument/1422260190.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":119,"obj_title":"Прикордонний пост","id_rozdil":1,"obj_src":" images/instrument/1422260204.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":120,"obj_title":"Інспекторський пост","id_rozdil":1,"obj_src":" images/instrument/1422260382.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":121,"obj_title":"Інспекторський пост","id_rozdil":1,"obj_src":" images/instrument/1422260399.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":122,"obj_title":"Тимчасовий прикордонний пост","id_rozdil":1,"obj_src":" images/instrument/1422260437.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":123,"obj_title":"Тимчасовий прикордонний пост","id_rozdil":1,"obj_src":" images/instrument/1422260446.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":124,"obj_title":"Районний відділ СБ","id_rozdil":1,"obj_src":" images/instrument/1422260481.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":125,"obj_title":"Районний відділ СБ","id_rozdil":1,"obj_src":" images/instrument/1422260492.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":126,"obj_title":"Митниця","id_rozdil":1,"obj_src":" images/instrument/1422260516.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":127,"obj_title":"Митниця","id_rozdil":1,"obj_src":" images/instrument/1422260526.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":128,"obj_title":"Обласна рада","id_rozdil":2,"obj_src":" images/instrument/1422267032.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":129,"obj_title":"Обласна рада","id_rozdil":2,"obj_src":" images/instrument/1422267044.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":130,"obj_title":"Районна рада","id_rozdil":2,"obj_src":" images/instrument/1422267069.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":131,"obj_title":"Районна рада","id_rozdil":2,"obj_src":" images/instrument/1422268228.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":132,"obj_title":"Сільська (селищна) рада","id_rozdil":2,"obj_src":" images/instrument/1422268253.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":133,"obj_title":"Сільська (селищна) рада","id_rozdil":2,"obj_src":" images/instrument/1422268264.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":134,"obj_title":"Обласна державна адміністрація","id_rozdil":2,"obj_src":" images/instrument/1422268527.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":135,"obj_title":"Обласна державна адміністрація","id_rozdil":2,"obj_src":" images/instrument/1422268541.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":136,"obj_title":"Районна державна адміністрація","id_rozdil":2,"obj_src":" images/instrument/1422268565.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":137,"obj_title":"Районна державна адміністрація","id_rozdil":2,"obj_src":" images/instrument/1422268575.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":163,"obj_title":"Резиденція прикордонного  уповноваженого (представника)","id_rozdil":3,"obj_src":" images/instrument/1422356114.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":164,"obj_title":"Резиденція прикордонного  уповноваженого (представника)","id_rozdil":3,"obj_src":" images/instrument/1422356145.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":165,"obj_title":"Резиденція заступника (помічника) прикордонного уповноваженого (представника)","id_rozdil":3,"obj_src":" images/instrument/1422356187.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":166,"obj_title":"Резиденція заступника (помічника) прикордонного уповноваженого (представника)","id_rozdil":3,"obj_src":" images/instrument/1422356201.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":167,"obj_title":"Орган охорони кордону","id_rozdil":3,"obj_src":" images/instrument/1422356236.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":168,"obj_title":"Орган охорони кордону","id_rozdil":3,"obj_src":" images/instrument/1422356247.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":169,"obj_title":"Регіональний орган управління","id_rozdil":3,"obj_src":" images/instrument/1422356280.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":170,"obj_title":"Регіональний орган управління","id_rozdil":3,"obj_src":" images/instrument/1422356297.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":171,"obj_title":"Підрозділ прикордонного (імміграційного, паспортного) контролю","id_rozdil":3,"obj_src":" images/instrument/1422356338.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":172,"obj_title":"Підрозділ прикордонного (імміграційного, паспортного) контролю","id_rozdil":3,"obj_src":" images/instrument/1422356349.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":173,"obj_title":"Прикордонний пост","id_rozdil":3,"obj_src":" images/instrument/1422356396.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":174,"obj_title":"Прикордонний пост","id_rozdil":3,"obj_src":" images/instrument/1422356422.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":175,"obj_title":"Підрозділ охорони кордону","id_rozdil":3,"obj_src":" images/instrument/1422356453.png","obj_type":"png","obj_position":1,"obj_rotate":1},{"id_obj":176,"obj_title":"Підрозділ охорони кордону","id_rozdil":3,"obj_src":" images/instrument/1422356463.png","obj_type":"png","obj_position":2,"obj_rotate":1},{"id_obj":177,"obj_title":"Радіотехнічний пост впс","id_rozdil":1,"obj_src":" images/instrument/1422358875.png","obj_type":"png","obj_position":0,"obj_rotate":1}],"id_last":218};
						var b = {};
						var c = {};
						
						for ( var i in a.contents_obj) {
							
							if (!b[a.contents_obj[i].id_rozdil]) { b[a.contents_obj[i].id_rozdil] = [];}
							b[a.contents_obj[i].id_rozdil].push(a.contents_obj[i]);
						}
						
						c.roz = a;
						c.obj = b;
						
						return c;
						
						//instrServ
						
					}
				},
				onEnter: function($stateParams){
						$stateParams.state="drawpoint";
						console.log("dddd");
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
				onEnter: function($localStorage){
						$localStorage.$reset();
				}
			});
				
	});
	
	
	

		