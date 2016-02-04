'use strict';
	angular.module('App')
		.provider('$olMap', function() {
			
			var options = {
				maxResolution: 156543.0339, // изучитьт
				projection: new OpenLayers.Projection("EPSG:900913"),
				displayProjection: new OpenLayers.Projection("EPSG:4326"),
				zoomMethod: null,
				units: 'm' // изучитьт
			};
		
			OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
			OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;
				
			var map = new OpenLayers.Map('map', options);
			      			
			OpenLayers.Lang.setCode('ru');
			//-------------подключаем первую подложку           
			var osm_l = new OpenLayers.Layer.OSM('Карта'); osm_l.transitionEffect = 'resize';
			var markers = new OpenLayers.Layer.Markers( "Markers" ); //----------пошукові маркери
			map.addLayers([osm_l, markers]); markers.displayInLayerSwitcher = false;
			
			$.getScript( "http://maps.googleapis.com/maps/api/js" + "?callback=googleMapsLoaded" +  "&sensor=false"); //---использует калбек-------------
		
		//------------------------калбек после загрузки Google API----------------	
		window.googleMapsLoaded = function(){
				var gsat = new OpenLayers.Layer.Google(
						"Google Satellite", {
						type: google.maps.MapTypeId.SATELLITE,
						numZoomLevels: 20
				   	}
				);
				var hibr = new OpenLayers.Layer.Google(
						"Google Гибрид", {
						type: google.maps.MapTypeId.HYBRID,
						numZoomLevels: 20
				   	}
				);
				var terain = new OpenLayers.Layer.Google(
						"Google terrain", {
						type: google.maps.MapTypeId.TERRAIN,
						numZoomLevels: 20
				   	}
				);
				var roadm = new OpenLayers.Layer.Google(
						"Google ROADMAP", {
						type: google.maps.MapTypeId.ROADMAP,
						numZoomLevels: 20
				   	}
				);
				
		   
			map.addLayers([ gsat, hibr, terain, roadm ]);	
			//-----XXXX спорній вопрос о необїходимости єтой переменной
			window.googleAPist = 1;		 
		};
		
				
		
			var p = new OpenLayers.Geometry.Point(37.87, 48.16);
				p.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
				map.moveTo( new OpenLayers.LonLat(p.x, p.y), 8); 
						
			var Knavig = new OpenLayers.Control.Navigation();
			var mashtL = new OpenLayers.Control.ScaleLine({geodesic: true, bottomInUnits: 'km', topInUnits: 'm' });
			var olS = new OpenLayers.Control.LayerSwitcher(); olS.fl = 0;
			var mPosit = new OpenLayers.Control.MousePosition();
				map.addControls([Knavig, mashtL, olS, mPosit]);
				
				

				return {

					map: map,
					olS: olS,
					markers: markers,
					
					$get: function() {
						return {
							map: map,
							markers: markers
						};
					}

				};

		});