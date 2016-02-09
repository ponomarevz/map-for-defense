
	angular.module('App').
		service('tematikLayerInit', function($olMap, instrServ, $stateParams) {
			var map = $olMap.map;
	
	/* 	masht_norm - значение масштаба на которій нормализуется значок
		scaleNorm - коефициент масштабирования
		h - размер значка в направлении
		zoom - текущий масштаб карты
	*/
	function setScale(masht_norm, scaleNorm, h) {
		var zoom = map.getZoom();
		var d = zoom - masht_norm;
		var sh;
		if (zoom == masht_norm) {
				s_h = h;
			} else {
				s_h = h + d*scaleNorm;
			}
			return s_h;
	};
	
	
		var id_obj = 105; //-------тимчасово
	
	//----------------хеш-таблица созданных тематических слоев---------------
		var layer = {};
		
	/*-----------функция доступа к тематическому слою ------------------------
							---	getLayer ---
		id - id-шник векторного слоя (для доступа из сервиса)
		
		возвращает ссылку на векторный OL слой по его id из
		хеш-таблицы layer
	-------------------------------------------------------------------------*/
		this.getLayer = function(id) {
			console.log(layer[id]);
			return layer[id];
		};
			
	/*-------------------конструктор инициализации тематического слоя--------
								--- layerInit ---
		name - имя слоя 
		type - тип весторного слоя
		name - название векторного слоя
		source - источник векторного слоя
		table - таблица векторного слоя
		id - id-шник векторного слоя (для доступа из сервиса)
		
		возвращает созданный векторный OL слой соответствующего типа и 
		добавляет его в хеш-таблицу layer по id векторного слоя
	------------------------------------------------------------------------*/
	this.layerInit = function(id, type, name, source, table, hesh_poley) {
		var tLayer = {}; //---------создаем тематический слой
		var  Htype;
		//-----------------------инициализация Strategy.Save ------------------------ возможно придется сделать открітй метод
		var saveStrategy = new OpenLayers.Strategy.Save({auto: true});
		saveStrategy.events.on({
		'success': function(event) {
					console.log('save'); //----------тестируем
			},
			'fail': function(event) {
					alert('Error! Изменения не вступили в силу, во избежании дальнейшей потери даннх перегрузите страничку'); //----------тестируем
			},
			scope: this
        });
		
		
		
		//----------------инициализация точечного слоя
		if (type == "point") {
			Htype =	OpenLayers.Handler.Point;
			var ncontexst = {
						w: 0,
						h: 0,
						width: function(feature){
							if (feature.attributes.bH) {
								var box = parseInt(feature.attributes.bH);
									
							} else {box = 25;} 
							
							box = setScale(8, 4, box);
							
							this.w = box;
							return box;
						},
						
						height: function(feature) {
							if (feature.attributes.bH) {
								var box = parseInt(feature.attributes.bH);
								
							} else {box = 25;} 
							//feature.rozm.h = box;
							
							box = setScale(8, 4, box);
							this.h = box;
							return box;
						},
						
						width_sel: function(feature){
							return this.w + 5;
						},
						
						height_sel: function(feature) {
							return this.h + 5;
						},
						
						display: function(feature) {
							var zoom = map.getZoom();
							if (feature.attributes.masht) {
								var masht_vidobr = feature.attributes.masht;
								if (zoom >= masht_vidobr) { 
									return "true";
								} else {
									return "none";
								}
							} else return "true";
						},
						
						xofs: function(feature) {
							var id;
							if (feature.attributes.instr) { 
								id = feature.attributes.instr; //---если рендерим слой
							} else id = id_obj;											   //---если наносим обїект
						    	xofs = this.w/2*(-1);
						    if (instrServ.getLocHesh()[id].position == 1) { 
								xofs = 0 - 2;
						    } 
						    if (instrServ.getLocHesh()[id].position == 2) { 
								xofs = this.w*(-1) +2;
						    } 
							return xofs; 
						},
						
						yofs: function(feature) {
						var id;
							if (feature.attributes.instr) { 
								id = feature.attributes.instr; //---если рендерим слой
							} else id = id_obj;											   //---если наносим обїект
						   	yofs = this.h/2*(-1);
						    if ((instrServ.getLocHesh()[id].position == 1) || (instrServ.getLocHesh()[id].position == 2)) { 
								yofs = this.h*(-1) + 2;
							} 
							return yofs; 
						},
						
						img: function(feature) {
							var id,
								url,
								tr,
								f_a = feature.attributes;
							if (f_a.instr) { 
								id = f_a.instr; //---если рендерим слой
								url = instrServ.getLocHesh()[id].src;
								if (instrServ.getLocHesh()[id].obj_type == "svg") {                                //if (hash[id].obj_type == "svg")
									if (!feature.blob) {
										var kolorS = "red";
										if (f_a.ahref != "") {
											kolorS = f_a.ahref;
										}
										
										tr = 0;
										if (f_a.fl_c == 1) {
											tr = f_a.fl_c;
										//	alert(tr);
										}
										//alert(feature.attributes.fl_c);
										
										//url = createBlobSvg(url, kolorS, tr);
										url = instrServ.getSvgUrlM(url, kolorS, tr);
										feature.blob =  url;
									} else url = feature.blob;
								}
							} else {
								console.log(instrServ.getLocHesh());
								url = instrServ.getLocHesh()[id_obj].src;
								if (instrServ.getLocHesh()[id_obj].obj_type == "svg") {                                 //(hash[id].obj_type == "svg")
									url = blobURL;
								}
							}
							return url;										   //---получаем ист src по id из хеша панели инструментов
						},
						
						img1: function(feature) {
							var id,
								url,
								tr,
								f_a = feature.attributes;
							if (f_a.instr) { 
								id = f_a.instr; //---если рендерим слой
								url = instrServ.getLocHesh()[id].src;
								
								if (instrServ.getLocHesh()[id].obj_type == "svg") {                                //if (hash[id].obj_type == "svg")
									
										var kolorS = "red";
										if (f_a.ahref != "") {
											kolorS = f_a.ahref;
										}
										
										tr = 0;
										if (f_a.fl_c == 1) {
											tr = f_a.fl_c;
										//	alert(tr);
										}
									//	url = createBlobSvg(url, kolorS, tr);
										
										//url = createBlobSvg(url, kolorS, tr, "ramka");
										url = instrServ.getSvgUrlM(url, kolorS, tr, "ramka");
									
								}
							} else {
								url = instrServ.getLocHesh()[id_obj].src;
								if (instrServ.getLocHesh()[id_obj].obj_type == "svg") {                                 //(hash[id].obj_type == "svg")
									url = blobURL;
								}
							}
							return url;										   //---получаем ист src по id из хеша панели инструментов
						},
						
						GetAngl: function(feature) {
							return feature.attributes.angle;
						}
													
			};
			
			var style_def = new OpenLayers.Style({
				graphicWidth: "${width}",  
                graphicHeight: "${height}",
				externalGraphic: "${img}",
				rotation: "${GetAngl}",
				graphicXOffset: "${xofs}",
				graphicYOffset: "${yofs}",
				fontSize: "15",
				display: "${display}"
			}, 
			{
				context: ncontexst
			});
				
			var style_sel = new OpenLayers.Style({
				graphicWidth: "${width_sel}",  
                graphicHeight: "${height_sel}",
				externalGraphic: "${img1}",
				rotation: "${GetAngl}",
				graphicXOffset: "${xofs}",
				graphicYOffset: "${yofs}",
				//label: "{}"
			}, 
			{
				context: ncontexst
			});
			
					
			//------------------ отдаем слой ------------------------------------
			tLayer.layer = new OpenLayers.Layer.Vector(name, {
				styleMap: new OpenLayers.StyleMap({"default": style_def, "select": style_sel, "temporary": style_def}),
				strategies: [new OpenLayers.Strategy.Fixed(), saveStrategy],
				protocol: new OpenLayers.Protocol.WFS({
					version: "1.0.0",
					url: source,
					featureType: table,
					geometryName: "geom"
				}),
					projection: 'EPSG:4326',
					renderers: ["SVG"]
				});
				
			tLayer.layer.events.on({
				'featureselected': onFeatureSelect,
				'featureunselected': onFeatureUnselect,
				'featuremodified': onFeatureModified,
				'vertexmodified': oneBefModified,
				
			});
		};
		//----------------инициализация точечного слоя
	
	
		if (type == "line") {
			Htype =	OpenLayers.Handler.Path;
		
			function rozrah(feature) {
					var f_a, ft_a;
						if (feature.sk_Geom_Point_status != 1) {
							var liine = feature.geometry.components[0].clone();
							var linePoints = createDirection(liine, "end", true);
							if (linePoints.length>=1)   {
								var ftpoint = new OpenLayers.Feature.Vector();
								ftpoint.geometry = linePoints[linePoints.length-1].geometry; 
								ftpoint.attributes = {};
								f_a = feature.attributes;
								ft_a = ftpoint.attributes;
								ft_a["angle"] = linePoints[linePoints.length-1].attributes["angle"];
								ft_a["color"] = f_a["color"];
								ft_a["opacity"] = f_a["opacity"];
								ft_a["with"] = f_a["with"];
								ft_a["id"] = feature.fid;
								L_Point.addFeatures(ftpoint);
								feature.sk_Geom_Point_status = 1; //---------флаг для линии что для нее уже нанесли стрелочку
							}
						}
						//-----------------если стоит флаг сложная геометрия для добавочной линии
						//if (feature.sk_Geom_Line) {
							//----------если сложная геометрия для линии штриховка мы очищаем линию 
							if (feature.attributes.type_skl_geom == 1) {
							if (feature.sk_Geom_Line_status == 1) {
								var ff = L_Line.getFeaturesByAttribute('id', feature.fid); 
								L_Line.removeFeatures(ff);
								feature.sk_Geom_Line_status = 0;
							}
							
							//----------если сложная геометрия для линии но она первоначальна мы ее устанавливаем
							if (feature.sk_Geom_Line_status != 1) {
								var ftline = new OpenLayers.Feature.Vector();
									
								ftline.attributes = {};
								f_a = feature.attributes;
								ft_a = ftline.attributes;
								ft_a["color"] = f_a.skl_geom_L_color;
								ft_a["with"] = f_a.skl_geom_L_with;
								ft_a["opacity"] = f_a.skl_geom_L_opacity;
								ft_a["type"] = f_a.skl_geom_L_type;
								//ftline.attributes["type"] = "1 5";
								ft_a["strokeLinecap"] = "butt";
								ft_a["id"] = feature.fid;
								
								feature.sk_Geom_Line_status = 1;
											
								var dx = 0.01; 
								if (feature.attributes.skl_geom_L_paralel && feature.attributes.skl_geom_L_paralel != 0)  {
									dx = feature.attributes.skl_geom_L_paralel
								};
								var lllline = new OpenLayers.Geometry.LineString(curveOffset(tLayer.layer, feature.geometry.components[0].getVertices(), dx ));
								ftline.geometry = lllline.clone();
								L_Line.addFeatures(ftline);
								//alert(lllline);
							}
							}
						//}
			}  
			
			 var nccontexst = {
						getColor: function(feature) {
								if(feature.attributes.color) {  return feature.attributes.color;} else {return "blue"}},
						getWidth: function(feature) {
								if(feature.attributes['with']) { return feature.attributes['with'];} else {return 2}; //------------XXX переделать єто я погарячился с идентификатором
								},
						getType: function(feature) {
								if(feature.attributes.type) {return feature.attributes.type;} else { return "solid"}
								},
						getSOpcity: function(feature) {
								if(feature.attributes.opacity) {return feature.attributes.opacity;} else { return 1}
								},
						display: function(feature) {
							var zoom = map.getZoom();
							if (feature.attributes.masht) {
								var masht_vidobr = feature.attributes.masht;
								if (zoom >= masht_vidobr) { 
									rozrah(feature);
									return "true";
								} else {
									//----------------TODO ------------ окрему функцыю
									var ff = L_Point.getFeaturesByAttribute('id', feature.fid); 
									L_Point.removeFeatures(ff);
									feature.sk_Geom_Point_status = 0;
									
									ff = L_Line.getFeaturesByAttribute('id', feature.fid); 
									L_Line.removeFeatures(ff);
									feature.sk_Geom_Line_status = 0;
									return "none";
								}
							} else return "true";
						}
					}
							
					var style_def = new OpenLayers.Style({
						strokeColor: "${getColor}",	strokeWidth: "${getWidth}",
						strokeOpacity: "${getSOpcity}", strokeDashstyle: "${getType}",
						display: "${display}"
                    }, {context: nccontexst} );
					
					var style_def_dodat_geom = {
						pointRadius: 3,
						cursor     : 'pointer',
						strokeColor: "${color}",
						fillColor  : "#1f1111",
						rotation:"${angle}",
						//graphicName:"arrow",
						graphicYOffset: -10,
						strokeWidth: "${with}",
						strokeOpacity: "${opacity}",
						strokeDashstyle: "${type}",
						strokeLinecap: "${strokeLinecap}"
					};
			
						
			L_Point = new OpenLayers.Layer.Vector();
			L_Point.displayInLayerSwitcher = false; //----отключаем видимость слоя узлов измерения в переключателе слоев
			L_Point.styleMap = new OpenLayers.StyleMap({"default": style_def_dodat_geom});
							
			L_Line = new OpenLayers.Layer.Vector();
			L_Line.displayInLayerSwitcher = false; //----отключаем видимость слоя узлов измерения в переключателе слоев
			L_Line.styleMap = new OpenLayers.StyleMap({"default": style_def_dodat_geom});
			// XXX  Подумать где и как добавлять слои УРААААААААААААА
			map.addLayers([L_Point, L_Line]);
			
			//------------------ отдаем слой ------------------------------------
			tLayer.layer = new OpenLayers.Layer.Vector(name, {
				styleMap: new OpenLayers.StyleMap({"default": style_def}),
				strategies: [new OpenLayers.Strategy.BBOX(), saveStrategy],
				protocol: new OpenLayers.Protocol.WFS({
						version: "1.0.0",
						url: source,
						featureType: table,
						geometryName: "geom"
				}),
						projection: 'EPSG:4326', 
						renderers: ["SVG"]
            });
			
			tLayer.layer.events.on({
				'featureselected': onFeatureSelect,
                'featureunselected': onFeatureUnselect,
				'featuremodified': onFeatureModified
			});
			
		}
		
		//---------------------------добавляем контролі---------------------------
		tLayer.control = {};
			
		var virtual = {
			strokeColor: "#ff0000",
			fillColor: "#ff0000",
			strokeOpacity: 1,
			strokeWidth: 2,
			pointRadius: 3,
			graphicName: "cross"
		};
		
		tLayer.control.edit = new OpenLayers.Control.ModifyFeature(tLayer.layer, { vertexRenderIntent: "temporary", virtualStyle: virtual})
		
		tLayer.control.rotate =  new OpenLayers.Control.RotateGraphicFeature(tLayer.layer); tLayer.control.rotate.mode = OpenLayers.Control.ModifyFeature.ROTATE;
		
		if (type == "point") {
			tLayer.control.draw = new OpenLayers.Control.DrawFeature(tLayer.layer, Htype, { 
				featureAdded: crateFeature
			});
		} else if (type = "line") {
			tLayer.control.draw = new OpenLayers.Control.DrawFeature(tLayer.layer, Htype, {
				handlerOptions: {citeCompliant: this.citeCompliant, multi:true},				
				featureAdded: crateFeature
			});
		}
	
		function crateFeature(feature) {
				if (type == "point") {
					var inf = parseInt(id_obj);
					feature.attributes.id = inf; 
					feature.attributes.instr = id_obj;
				}
				var zoom = map.getZoom();
				feature.attributes.masht = zoom;
				feature.attributes.log_izm = "c>"+user+">"+t_date+">"+t_vremy+">";
			
				var LonLat = new OpenLayers.LonLat(feature.geometry.getCentroid().x, feature.geometry.getCentroid().y);
					
				$('#information1').css({'width': win.width, 'height': win.height})
						.popUp("contentAdd", feature, hesh_poley, "create", "Заполните параметры", function() {
							//saveStrategy_pdr.save();
							feature.state = OpenLayers.State.UPDATE;
							tLayer.layer.addFeatures(feature);  //----------после сохранения добавляем обїект
							tLayer.layer.redraw();
						}).popUp("updatePosition", LonLat).fadeIn(1000);
					
			} 
	
		//---------------------обработчики собітий для контролов-------------------
								
				
		function onFeatureModified(evt) {
							
			if (type == "line") {	
				var ff = L_Point.getFeaturesByAttribute('id', evt.feature.fid); 
				L_Point.removeFeatures(ff);
				evt.feature.sk_Geom_Point_status = 0;
				
				ff = L_Line.getFeaturesByAttribute('id', evt.feature.fid); 
				L_Line.removeFeatures(ff);
				evt.feature.sk_Geom_Line_status = 0;
			} 
			
		}
				
		function onFeatureSelect(evt) {
			var state =  $stateParams.state;
			 console.log(state);
			
			var feature = evt.feature;
									feature_select = feature;
			feature.select = true;
			
			var inf = feature.attributes.id;
			var LonLat = new OpenLayers.LonLat(feature.geometry.getCentroid().x, feature.geometry.getCentroid().y);
			var point_px = map.getPixelFromLonLat(LonLat);	
					
			if (feature.geometry instanceof OpenLayers.Geometry.MultiLineString) {
				var str = "";
				var f_g_c = feature.geometry.components[0].components;
				for (i in f_g_c) {
					str = str + f_g_c[i].x + "," + f_g_c[i].y + ",";
				}
				
				var atr = JSON.stringify(feature.attributes)
				var re = /#/g;
				var result_atr = atr.replace(re, "~");	
				
				//router.navigate("feature_modifed/" + feature.layer.name + "/" + feature.fid + "/" + feature.renderIntent + "/" + str + "/" + result_atr);
				
			}
			
			if (feature.geometry instanceof OpenLayers.Geometry.Point) {
				
				var atr = JSON.stringify(feature.attributes)
				var re = /#/g;
				var result_atr = atr.replace(re, "~");					
				//router.navigate("feature_modifed/" + feature.layer.name + "/" + feature.fid + "/" + feature.renderIntent + "/" + feature.geometry.x + "/" + feature.geometry.y + "/" + result_atr);	
				console.log(result_atr);
			
			}
			
						
			if (state == 2) {
				$('#information1').css({'width': win.width, 'height': win.height})
				.popUp("contentAdd", feature, hesh_poley, "inf", "Подпись окна").popUp("updatePosition", LonLat).fadeIn(1000); 
			}
					//if 	(podr.redaguv) {
					
			if (state == 'drag') { 
				feature.state = OpenLayers.State.UPDATE;
				tLayer.control.edit.selectFeature(feature);
				
			}
			if (state == 'rotatter') { 
				//feature.state = OpenLayers.State.UPDATE;
				//tLayer.control.rotate.selectFeature(feature);
				//alert("asdxas");
			}
								
			if (state == 3) {
				$('#information1').css({'width': win.width, 'height': win.height})
					.popUp("contentAdd", feature, hesh_poley, "update", "Подпись окна", function() {
						feature.blob = null;		
						feature.state = OpenLayers.State.UPDATE;
						saveStrategy.save();
						tLayer.layer.redraw();
						if (type == "line") {
							var ff = L_Line.getFeaturesByAttribute('id', evt.feature.fid); 
							L_Line.removeFeatures(ff);
							feature.sk_Geom_Line_status = 0;
						}
				}).popUp("updatePosition", LonLat).fadeIn(1000); 
			}
			
			if (state == 4) {
				feature.state = OpenLayers.State.DELETE;
				saveStrategy.save();
				tLayer.layer.redraw();
			}
		}
		function	oneBefModified(evt) {
			console.log(evt.feature.layer.name);
		}
		function onFeatureUnselect(evt) {
			var state =  $stateParams.state;
			feature_select = null;
				
			var feature = evt.feature;
			feature.select = false;
			if (state== 'drag') {
				tLayer.control.edit.unselectFeature(tLayer.control.edit.feature);
				//router.navigate("feature_modifed/" + feature.layer.name + "/" + feature.fid + "/" + feature.renderIntent + "/" + feature.geometry.x + "/" + feature.geometry.y + "/" + JSON.stringify(feature.attributes));
			}
			if (state == 'rotatter') { 
				//feature.state = OpenLayers.State.UPDATE;
				//tLayer.control.rotate.unselectFeature(tLayer.control.rotate.feature);
				//alert("asdxas");
			}
			if (state == 2) {
				$('#information').hide(); 
			}
		}
				
		//-----------возвращаем Layer для доступа из сервиса
				map.addLayer(tLayer.layer);
				
				layer[id] = tLayer;
				return tLayer;
			
	};
	
	//----------- объект содержащий два OL контрола Select-------------------
	
	var selectContr = {};
	/*-------------------конструктор инициализации тематического слоя--------
								--- selectInit ---
		Инициализирует два контрола для Selecta необходимо для создания 
		множественного Selecta из всех тематических слоев и создания єффекта
		Hover
		требует инициализации после добавления всех тематических слоев
		
		возвращает два OL контрола Select  и добпавляет их в
		хеш-таблицу selectContr по:
		
		------------------------------------------------------------------------*/
	this.selectInit = function() {
			var layerMas = [];
			for (i in layer) {
				layerMas.push(layer[i].layer);
			};
			
			var Kselect1 = new OpenLayers.Control.SelectFeature( layerMas, { 
						hover: true, 
						callbacks:{
                    //--------------- наступает до селекта
					'over' : function(f) {
						if ((f.fid) && (f.select != true)) {
							f.renderIntent = "select"; 
							f.layer.drawFeature(f);
							//alert(f.attributes.bH);
						}
					},
					'out' : function(f) {
						if ((f.fid) && (f.select != true)) {
							f.renderIntent = "default"; 
							f.layer.drawFeature(f);
						}
					},
					'click' : function(f) {
						
					}
				}
				
			});
			
			var Kselect = new OpenLayers.Control.SelectFeature(layerMas);  
			selectContr['osn'] = Kselect1;
			selectContr['dop'] = Kselect;
			
			map.addControls([Kselect1, Kselect]);
			
	};
	/*---------------возвращает контрол  тематического слоя--------
								--- getSelect ---
	-------------------------------------------------------------------*/
	this.getSelect = function(id) {
		return selectContr[id];
	}
	/* ---------------метод для декативации всех контролов--------------
							--- allControlDeactivate ---
		деактивируем селекты, драги, вращатели, нанесение
	-------------------------------------------------------------------*/
	this.allControlDeactivate = function() {
		selectContr['osn'].deactivate();
		selectContr['dop'].deactivate();
		for (i in layer) {
			layer[i].control.edit.deactivate(); 
			layer[i].control.rotate.deactivate();
			layer[i].control.draw.deactivate();
		};
	}
	
});
			