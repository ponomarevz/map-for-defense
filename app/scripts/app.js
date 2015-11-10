



	angular.module('App', []).
		controller('NavigationCtrl', function ($scope, $location, routpar) {
		
		$scope.$watch(function () { 
			return $location.path();
		}, 
		function (newPath) {
			var arg = newPath.split("/"); //-------------передаем полній хеш
				if (routes[newPath]) {
					//----------------татичекий роут
					$scope.selectedRoute = routes[newPath];
					//alert($scope.selectedRoute.templateUrl);
				} else {
					var f_rout = "/" + arg[1]; 
					if (routes[f_rout] && routes[f_rout].templateFunParam && routes[f_rout].templateFunParam.length == arg.length - 2) {
						$scope.selectedRoute = routes[f_rout];
						//готовим динамичекую чать
					} else $scope.selectedRoute = defaultRoute;
				}
			
			var ind = $scope.selectedRoute; 
			if (ind.templateFun) {
				routesMethod[ind.templateFun].apply(ind, arg.slice(2)); 
			};
		});
		
		/*--------------------Мой роутер-----------------------------
		'/' - путь роутера поле хеша ( для динаичекого поддерживаем протой путь только до первого леша отальное динамика)
		templateUrl - адре HTML шаблона подтавляемого в ng-ilude
		templateFun - функция віполняемая в результате роутинга на подобии bakbone
		templateFunParam - пиок игнатур параметров в динамичекой чати роутера в виде маива
		--------------------------------------------------------------*/
		var routes = {
			'/': {templateUrl: '', templateFun: ''},
			'/reestr': {templateUrl: '', templateFun: 'reestr'},
			'/signUp': {templateUrl: 'views/signUp.html', templateFun: 'signUp'},
			'/navigate': {templateUrl: '', templateFun: 'nav', templateFunParam: ['layer', 'zoom', 'lon', 'lat']}, 
			'/layer': {templateFun: 'layer'},
			'/navig': {templateFun: 'navig'},
			'/drawpoint': {templateFun: 'drawpoint'},
			'/drawline': {templateFun: 'drawline'},
			'/drag': {templateFun: 'drag'},
			'/rotater': {templateFun: 'rotater'},
			'/attrib': {templateFun: 'attrib'},
			'/deleter': {templateUrl: '', templateFun: 'deleter'},
			'/inform': {templateUrl: '', templateFun: 'inform'},
			'/messure': {templateUrl: '', templateFun: 'messure'}
			//'feature_modifed/:layer/:feat_id/:feat_rend/:feat_geomx/:feat_geomy/:feat_attr' : 'featModif_point',
			//eature_modifed/:layer/:feat_id/:feat_rend/:str/:feat_attr' : 'featModif_line'
		};
		var defaultRoute = routes['/'];
		function deactivInstr() {
			olS.minimizeControl();
		}		
	var routesMethod = {
		reestr: function(){
			alert("dADa");
		},
		signUp: function() {
			//$('#rozdil').signUp('show');
		},
		nav: function(layer, zoom, lon, lat) {
			layer = decodeURI(layer.replace(/\./g, "%"));
			map.moveTo( new OpenLayers.LonLat(lon, lat), zoom);
			var l = map.getLayersByName(layer)[0];
			map.setBaseLayer(l);
		},
//------------ роутер панель интрументов---------------
		layer: function() {
			routpar.setState("layer");
			deactivInstr();
			olS.maximizeControl();
		},
		navig: function() {
			routpar.setState("navig");
			deactivInstr();
		},
		drawpoint: function() {
			routpar.setState("drawpoint");
			deactivInstr();
		},
		drawline: function() {
			routpar.setState("drawline");
			deactivInstr();
		},
		drag: function() {
			routpar.setState("drag");
			deactivInstr();
		}, 
		rotater: function() {
			routpar.setState("rotater");
			deactivInstr();
		}, 
		attrib: function() {
			routpar.setState("attrib");
			deactivInstr();
		}, 
		deleter: function() {
			routpar.setState("deleter");
			deactivInstr();
		},	
		inform: function() {
			routpar.setState("inform");
			deactivInstr();
		},	
		messure: function() {
			routpar.setState("messure");
			deactivInstr();
		}
	}	
	});


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
		osm_l = new OpenLayers.Layer.OSM('Карта'); osm_l.transitionEffect = 'resize';
		markers = new OpenLayers.Layer.Markers( "Markers" ); //----------пошукові маркери
		map.addLayers([osm_l, markers]); markers.displayInLayerSwitcher = false;
		
		var p = new OpenLayers.Geometry.Point(37.87, 48.16);
			p.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
			map.moveTo( new OpenLayers.LonLat(p.x, p.y), 8); 
						
			Knavig = new OpenLayers.Control.Navigation();
			mashtL = new OpenLayers.Control.ScaleLine({geodesic: true, bottomInUnits: 'km', topInUnits: 'm' });
			olS = new OpenLayers.Control.LayerSwitcher(); olS.fl = 0;
			mPosit = new OpenLayers.Control.MousePosition();
			map.addControls([Knavig, mashtL, olS, mPosit]); 	
		
	//$('#men_kont').menu('init');
		
			

	map.events.on({"moveend": stateChange}); 
	function stateChange(e) {
		//	router.navigate("navigate/" + map.baseLayer.name + "/" + map.getZoom()+ '/' +  map.getCenter().lon + "/" + map.getCenter().lat);
		var konvert = encodeURI(map.baseLayer.name);
		location.hash = "/navigate/" + konvert.replace(/%/g, ".")  + "/" + map.getZoom()+ '/' +  map.getCenter().lon + "/" + map.getCenter().lat;
		
	}	
        