'use strict'
	angular.module('App').
		service('olMap', function() {
			
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
        this.map = map;       			
		OpenLayers.Lang.setCode('ru');
		//-------------подключаем первую подложку           
		var osm_l = new OpenLayers.Layer.OSM('Карта'); osm_l.transitionEffect = 'resize';
		var markers = new OpenLayers.Layer.Markers( "Markers" ); //----------пошукові маркери
		map.addLayers([osm_l, markers]); markers.displayInLayerSwitcher = false;
		
				
		
		var p = new OpenLayers.Geometry.Point(37.87, 48.16);
			p.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
			map.moveTo( new OpenLayers.LonLat(p.x, p.y), 8); 
						
		this.Knavig = new OpenLayers.Control.Navigation();
		this.mashtL = new OpenLayers.Control.ScaleLine({geodesic: true, bottomInUnits: 'km', topInUnits: 'm' });
		var olS = new OpenLayers.Control.LayerSwitcher(); olS.fl = 0;
		this.olS = olS;
		this.mPosit = new OpenLayers.Control.MousePosition();
			map.addControls([this.Knavig, this.mashtL, this.olS, this.mPosit]); 
			
			
		});