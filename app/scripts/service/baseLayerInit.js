'use strict';
	angular.module('App').
		service('blInitService', function() {
			
			var baseLayerIn = [];
		//------------------------загружаем Google API----------------		
		
		
		//------------------------СЛОИ OSM----------------	
		var osm_l_rel1 = new OpenLayers.Layer.OSM("Рельеф1 OSM",
			["http://a.tile.opencyclemap.org/cycle/${z}/${x}/${y}.png",
			"http://b.tile.opencyclemap.org/cycle/${z}/${x}/${y}.png",
			"http://c.tile.opencyclemap.org/cycle/${z}/${x}/${y}.png"] , {transitionEffect: 'resize'});
			baseLayerIn.push(osm_l_rel1);	
				
		var osm_l_topo = new OpenLayers.Layer.OSM("Топографічна OSM",
			["http://a.tile.opentopomap.org/tiles/${z}/${x}/${y}.png",
			"http://b.tile.opentopomap.org/tiles/${z}/${x}/${y}.png",
			"http://c.tile.opentopomap.org/tiles/${z}/${x}/${y}.png"] , {transitionEffect: 'resize', tileOptions: { crossOriginKeyword: null}});
			baseLayerIn.push(osm_l_topo);	
					
		var osm_l_rel2 = new OpenLayers.Layer.OSM("Рельеф2 OSM",
			["http://a.tile.opencyclemap.org/landscape/${z}/${x}/${y}.png",
			"http://b.tile.opencyclemap.org/landscape/${z}/${x}/${y}.png",
			"http://c.tile.opencyclemap.org/landscape/${z}/${x}/${y}.png"] , {transitionEffect: 'resize', tileOptions: { crossOriginKeyword: null}});
			baseLayerIn.push(osm_l_rel2);	
		
		//------------------------СЛОИ HERE----------------
		var HereSat = new OpenLayers.Layer.Here('HERE Satellite', {
			type: 'satellite.day',
			app_id: 'SqE1xcSngCd3m4a1zEGb',
			tile_style_version: 'newest',
			token: 'r0sR1DzqDkS6sDnh902FWQ'
		});
		baseLayerIn.push(HereSat);	
  		
		//------------------------СЛОИ BING---------------
		/*
		var BingApiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";		
		var BRoad = new OpenLayers.Layer.Bing(OpenLayers.Util.extend({
			initLayer: function () {
            // pretend we have a zoomMin of 0
            this.metadata.resourceSets[0].resources[0].zoomMin = 0;
            OpenLayers.Layer.Bing.prototype.initLayer.apply(this, arguments);
			}
			}, {
            key: BingApiKey,
            type: "Road"
            //,  metadataParams: { mapVersion: "v1" }
        }));
		//baseLayerIn.push(BRoad);	
		
		
        var BSat = new OpenLayers.Layer.Bing(OpenLayers.Util.extend({
            initLayer: function () {
                this.metadata.resourceSets[0].resources[0].zoomMin = 0;
                OpenLayers.Layer.Bing.prototype.initLayer.apply(this, arguments);
            }
        }, {
            key: BingApiKey,
            type: "Aerial",
            numZoomLevels: 18,
			transitionEffect: 'resize'
        }));
		//baseLayerIn.push(BSat);	
   
       var  BGibr = new OpenLayers.Layer.Bing(OpenLayers.Util.extend({
            initLayer: function () {
                this.metadata.resourceSets[0].resources[0].zoomMin = 0;
                OpenLayers.Layer.Bing.prototype.initLayer.apply(this, arguments);
            }
        }, {
            key: BingApiKey,
            type: "AerialWithLabels",
            numZoomLevels: 18
        }));
		//baseLayerIn.push(BGibr);	
		*/
		//------------------------СЛОИ TMS---------------
		var serverImage = "http://212.26.144.110";
		var serverMap = "http://212.26.144.110";
		
		function overlay_getTileURL(bounds) {
		
			var res = this.map.getResolution();
			var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
			var y = Math.round((bounds.bottom - this.tileOrigin.lat) / (res * this.tileSize.h));
			var z = this.map.getZoom();
     	
			if (this.layername == "orto")  return serverImage + "/tile2/orto_10000/" + z + "/" + x + "/" + y + "." + this.type;
			if (this.layername == "topo") return serverImage + "/tile2/map_100000/" + z + "/" + x + "/" + y + "." + this.type
		}
			
		var tmsLux = new OpenLayers.Layer.XYZ( "Карта Luxena mq.ua", "http://tiles.mq.ua/${z}/${x}/${y}.png?v=25.12.14", {   // url: '', serviceVersion: '.', layername: '.',
			alpha: true,
			isBaseLayer: true,
		});
		baseLayerIn.push(tmsLux);	
			
		var tmsoverlay = new OpenLayers.Layer.TMS( "Ортофотоплані", "", {   // url: '', serviceVersion: '.', layername: '.',
			type: 'jpg',
			layername: "orto",
			getURL: overlay_getTileURL,
			alpha: true,
			isBaseLayer: true,
		});
		baseLayerIn.push(tmsoverlay);	
			
		var tmsoverlay_topo = new OpenLayers.Layer.TMS( "Топонрафічна мапа 1:100000", "", {   // url: '', serviceVersion: '.', layername: '.',
			type: 'jpg',
			layername: "topo",
			getURL: overlay_getTileURL,
			alpha: true,
			isBaseLayer: true,
		});
		baseLayerIn.push(tmsoverlay_topo);	

		//------------------------ДОБАВЛЯЕМ СЛОИ НА КАРТУ---------------
		return baseLayerIn;
			
			
			
			
		});