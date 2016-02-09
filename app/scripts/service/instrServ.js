/*
	сервис для загрузки и обновления панели панели точечных инструментов
*/
'use strict'
angular
	.module('App')
		.service('instrServ', function($http,  $window){
			
			var panel = {};
			
			
					/* API-function setAtribut SVG jbject 
					return SVG data string with replase kolor
					*/
					function setAtr(svgS, strKolor, trn) {
						var re = /#ff0000/g;
						
						var result = svgS.replace(re, strKolor);
							var tr = "<g>";
							
							if (trn == 1) {
									tr = '<g transform = "matrix(-1 0 0 1 40 0)">';
									//tr = '<g transform="scale(2, 2)">';
								//	alert(tr);
							}
							var re1 = /<g>/g;
						var result = result.replace(re1, tr);
						//alert(result);
						//re = /zn_scale/g;
						//result = result.replace(re, scale);
						return result;
						// TODO сложній атрибут 
					}
					/* API function for create BLOB URL string with SWG
						input svg data string, and attribut 
						return BLOB URL string with SWG
					*/
					
					var DOMURL = $window.URL || $window.webkitURL || $window;
					
					function createBlobSvg(data, atribut, trn, ramka) {
						
						data = data.replace(/№/g, '"');
						
						if (ramka) {
							//alert("dfsd");
							data = setRamka(data);
							
						}
						data = setAtr(data, atribut, trn); 
						var svg = new $window.Blob([data], {type: 'image/svg+xml;charset=utf-8'});
						
						var url = DOMURL.createObjectURL(svg);
						//console.log(url);
						//var url = "/img/my/telekom/i1_act.png";
						
						return url;
					}
					

					function setRamka(data) {
						
							var data1 = setAtr(data, "blue", 0); 
						//	var tr = '</g>' + data1;//' <rect stroke-width="2" fill-opacity="0" stroke-dasharray="2,2" stroke="#ff0000" fill="#ffffff" id="svg_2" height="38" width="38.25" y="1" x="0.875"/><rect stroke-width="2" stroke="#ff0000" fill="#ff0000" id="svg_3" height="4.5" width="4.25" y="0.875" x="1.0625"/><rect id="svg_4" stroke-width="2" stroke="#ff0000" fill="#ff0000" height="4.5" width="4.25" y="34.75" x="0.875"/><rect id="svg_5" stroke-width="2" stroke="#ff0000" fill="#ff0000" height="4.5" width="4.25" y="1" x="34.875"/><rect id="svg_6" stroke-width="2" stroke="#ff0000" fill="#ff0000" height="4.5" width="4.25" y="34.75" x="34.875"/><rect id="svg_7" stroke-width="2" stroke="#ff0000" fill="#ff0000" height="4.5" width="4.25" y="34.9375" x="18.25"/><rect id="svg_8" stroke-width="2" stroke="#ff0000" fill="#ff0000" height="4.5" width="4.25" y="1" x="17.6875"/><rect id="svg_9" stroke-width="2" stroke="#ff0000" fill="#ff0000" height="4.5" width="4.25" y="17.9375" x="34.875"/><rect id="svg_10" stroke-width="2" stroke="#ff0000" fill="#ff0000" height="4.5" width="4.25" y="18.4375" x="1"/>';
							var tr = 'stroke-width="2"';
						var re1 = new RegExp('stroke-width="null"', "g");
					
						var result = data1.replace(re1, tr);
						//alert(result);
						return result;
						// TODO сложній атрибут 
					}
			
			
			//---------------получение панели инструментов-----------------
			var panel = {};
			var hesh = {};
			
			this.getInstr = function() {
				var url = 'http://10.246.2.194/pinstrEx.php';
				
				return $http({'method': 'get', 'url': url}).then(function(res){
									
						var b = {};
						var c = {};
						var a = res.data;
						
						for ( var i in a.contents_obj) {
							var item = a.contents_obj[i];
							if (!b[item.id_rozdil]) { 
								b[item.id_rozdil] = [];
							}
							b[item.id_rozdil].push(item);
							
							hesh[item.id_obj] = { 	'src' : item.obj_src, 
										'position' :  item.obj_position, 
										'rotation' :  item.obj_rotate, 	
										'obj_type' : item.obj_type, 
										'title': item.obj_title,
										'rozdil' : item.id_rozdil
										};
							
						
						c.roz = a;
						c.obj = b;
						panel = c;
						//alert("z nene");
						}
						return c;
					
					})
			}
			
			//---------------интерфейс для отдачи панели-------------
			this.getLocPan = function() {
				return panel;
			}
			
			this.getLocHesh = function() {
				return hesh;
			}
			
			this.getSvgUrl = function(url) {
				
				
				return createBlobSvg(url, "red");
				
			}
			
			this.getSvgUrlM = function(url) {
			//	console.log(arguments);
				
				return createBlobSvg.apply(this, arguments);
			}
		
		
		});