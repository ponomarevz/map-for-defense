(function( $ ) {
	var ssulka; //----------ссылка на контейнер---------------------------
	//-------------------------------HTML Базового контейнера поиска------
	var root_html = '<input type="text" name="in_poisk" id="in_poisk" class="pole_poisk" placeholder="Ведіть пошуковий запит:"/>' +
							'<div id="poisk_nastr" class="knopka_poisk">' +
							'<img title="НАЛАШТУВАННЯ ПАРАМЕТРІВ ПОШУКУ" src="/img/2/poisk_nastr.png"/>   </div>' +
							'<div id="knopka_poisk" class="knopka_poisk">' +
							'<img title="ВИКОНАННЯ ПОШУКУ" src="/img/2/lupa.png" id="img_kn_poisk"/>  </div>';
	var panel_nastr_html = '<div id="panel_nalaht_poisk"    >' +
							'<div id = "wrap_nal_poisk">' +
							'<div class = "head_red" > Налаштуйте параметри пошуку  </div>' +
							'<div id="panel_nalaht_poisk_exit"   class = "head_exit"><img title="Вийти" id="exit_nalasht" src="img/interface/exit.png" /></div>' +
							'<div id="wrap_panel_nalaht_poisk" > <br>' +
								'<span>Що шукаємо: <br>'+
								'<INPUT TYPE="RADIO" NAME="Poshuk" VALUE ="PgKoord" CHECKED><span>Пошук положення на мапі за географічними координатами <br>'+
								'<INPUT TYPE="RADIO" NAME="Poshuk" VALUE ="Pnp" CHECKED><span>Пошук місця за адресою Геокодер Google <br>'+
								'<INPUT TYPE="RADIO" NAME="Poshuk" VALUE ="Pobj" CHECKED><span>Пошук тематичної інформації <br>'+
							'<hr>'+
								'<span>Фільтр пошуку: <br>'+
								'<div>' +
								
								'</div>' +
							'</div>' +
							'<br>' +
							'</div>' +
							
							'<div id="result_poisk" class = "wrap">' +
							'<div class = "head_red" > Результати пошуку</div>'   +
							'<div id="result_poisk_exit"   class = "head_exit"><img title="Вийти" id="exit_respoisk" src="img/interface/exit.png" /></div>'  +
							'<div id="wrap_result_poisk"  > <br>' + 


							'</div>'+
							
												
							
							//'<span> На даний час результати пошуку відсутні' +
					
							'</div>';
						//-------------------------установка маркера на позиции---------------------------
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
						
						function searchBD(zn_name) {
							$.get("search.php", { name: zn_name}, function(result){ 
							//var point = new OpenLayers.Geometry.Point()
							//point = OpenLayers.Geometry.fromString(result);
							var res = result.split(",");
							//alert(res[0] + "  "+ res[1]+ "  "+ res[2]);
							var point0 = new OpenLayers.Geometry.Point(res[1], res[2]);
							//Помним что карта отображается в одной проекции, а с данными работает в другой проекции. 
							point0.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
							//map.moveTo( new OpenLayers.LonLat(point0.x, point0.y), 12);
				
							
							})	
						}
						
												
						function searchKoord(koords){
							var html = "";
							var res = koords.split(",");
							var point = new OpenLayers.LonLat(res[0], res[1]);
							var proj = new OpenLayers.Projection("EPSG:4326");
							var LonLat = point.transform(proj, map.getProjectionObject());
							if (googleAPist == 1) {
								var latlng = new google.maps.LatLng(res[1], res[0]);
								var geoCoder = new google.maps.Geocoder();
								var request = { 'latLng': latlng };
									var st;
								geoCoder.geocode(request, function(result, status){
								if (google.maps.GeocoderStatus.OK) {
									if(!result[0]){
										html = "<span>За данним запитом відомості відсутні";
									}	else {
										html = "<span>За координатами " + latlng + " знаходиться: "   + result[0].formatted_address + "</span> <br><hr>";
									}
																													
								} else  {
									html = "<span>Google API Geokoder Filed " ;
								}
										$('#wrap_result_poisk').empty();
										$('#wrap_result_poisk').append(html);	
								})
							} else {
									html = "<span>Google API - не завантажено" 			
										$('#wrap_result_poisk').empty();
										$('#wrap_result_poisk').append(html);
							}
							map.setCenter(LonLat, 15);
							setMarker(markers, LonLat);
						}
						//---------------------google search--------------------------------------
						function searchGoggle(address){
							var html = "";
							if (googleAPist == 1) {
								var geoCoder = new google.maps.Geocoder(address);
								var request = { address:address };
								var LonLat;
								//var map = document.getElementById("map");
								geoCoder.geocode(request, function(result, status){
									if (google.maps.GeocoderStatus.OK) {
									if(!result[0]){
										html = "<span>За данним запитом відомості відсутні";
									}	 else {
									var proj = new OpenLayers.Projection("EPSG:4326");
									var point = new OpenLayers.LonLat(result[0].geometry.location.lng(), result[0].geometry.location.lat());
									LonLat = point.transform(proj, map.getProjectionObject())

									setMarker(markers, LonLat)
										
									map.setCenter(LonLat, 15);
							
										var html = "<span>" + address + " знаходиться за координатами: " + result[0].geometry.location.lng() +" "+ result[0].geometry.location.lat() + "</span> <br><hr>" 			
									}
										$('#wrap_result_poisk').empty();
										$('#wrap_result_poisk').append(html);
									} else {
										html = "<span>Google API Geokoder Filed " ;
									}	
										$('#wrap_result_poisk').empty();
										$('#wrap_result_poisk').append(html);									
								})
							} else {
								var html = "<span>Google API - не завантажено" 		
							}
						
						}
						
							
							
	var methods = {
		//-------------------инициализация контрола--------------------------
		init : function() { 
			ssulka = this; 
    		ssulka.html(root_html + panel_nastr_html );
			$('#panel_nalaht_poisk').css({"width" : "412px", "top": "29px" });
			$('#result_poisk').css({"width" : "412px", "display": "none" });
		
			
			//------------------------------Обработчики для меню поиск -----------------------------------------------------
	           
			$('#knopka_poisk').click(function(event){
				var zn_name = $('#in_poisk').val();
				var par_poisk = $("input:radio[name='Poshuk']:checked").val();
			
							ssulka.css({"top" : "6px"});
							$('#panel_nalaht_poisk').show();
							$('#result_poisk').show();
				if (par_poisk == "PgKoord") {
					searchKoord(zn_name);
					html = "<span>За координатами " + zn_name + " знаходиться</span> <br><hr>";
				}
				if  (par_poisk == "Pnp") {
					var lonlat = searchGoggle(zn_name);
					
				}
				
				
			});
			
			$('#panel_nalaht_poisk_exit').click(function(event){
				
				$('#wrap_nal_poisk').hide();
				if ($('#wrap_nal_poisk').is(":hidden") && $('#result_poisk').is(":hidden")){
					$('#panel_nalaht_poisk').hide();
					ssulka.css({"top" : "18px"});
				}
			});
			
			$('#result_poisk_exit').click(function(event){
				//ssulka.css({"top" : "18px"});
				$('#result_poisk').hide();
				if ($('#wrap_nal_poisk').is(":hidden") && $('#result_poisk').is(":hidden")){
					$('#panel_nalaht_poisk').hide();
					ssulka.css({"top" : "18px"});
				}
			});
			
			$('#poisk_nastr').click(function(event){
				ssulka.css({"top" : "6px"});
				$('#panel_nalaht_poisk').show();
				$('#wrap_nal_poisk').show();
			});
			
			return ssulka;
		},
		//------------------отображение контрола------------------------------
		show : function() {
			ssulka.show();
		},
		//-----------------скрітие контрола-----------------------------------
		hide : function() { 
			ssulka.hide();
		}	
	};
  
  
    $.fn.pPoisk = function( method ) {
    // логика вызова метода
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Метод с именем ' +  method + ' не существует для jQuery.tooltip' );
		} 
	};
   
})(jQuery);