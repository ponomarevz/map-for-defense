(function( $ ) {
	function Kdeaktivator() {
		$('#pan_instr_z6').addClass("pan_instr_z_nv");
		$('#panel_redactor').hide();
		$('.pan_instr_zz').data("fl", 0).css({'background-color': 'rgba(138, 176, 204, 0.5)'}); 
		$('#pan_instr_z6 img').attr('src', 'images/menu/redact.png');
		$('#pan_instr_z6').css({'background-color': 'rgba(138, 176, 204, 0.5)'}).data("fl", 1);
		olS.minimizeControl(); olS.fl = 0; 
	}
  var methods = {
    
	init : function() { 
		ssulka = this; //----------ссылка на контейнер---------------------------
      	
		ssulka.html(
			'<div id="panel" class="o1" title="Выбор элемента"></div>' +
			'<div id = "pan_instr">' +  
			'<br> <br> <br>' +
					'<div id = "pan_instr_z0" class = "pan_instr_zz pan_instr_z_nv">' +
						'<a href="#changeLayer"><img title="ВИБЕРІТЬ ШАР" src="images/menu/layer.png" class = "kn_instr" id="layer"/></a></div>' +
					'<br>' +
					'<div id = "pan_instr_z1" class = "pan_instr_zz pan_instr_z_v">' +
						'<a href="#"><img title="ЗБІЛЬШИТИ МАСШТАБ" src="images/menu/zoomp.png" class = "kn_instr" id="zoom_in"/></a></div>' +
					'<div id = "pan_instr_masht_ind" class = "pan_instr_zz">' +
						'<span id="masht"></span></div>' +
					'<div id = "pan_instr_z2" class = "pan_instr_zz">' +
						'<a href="#"><img title="ЗМЕНЬШИТИ МАСШТАБ" src="images/menu/zoomm.png" class = "kn_instr" id="zoom_out"/></a></div>' +
					'<div id = "pan_instr_z3" class = "pan_instr_zz pan_instr_z_n">' +
						'<a href="#changeNavigation"><img title="НАВІГАЦІЯ" src="images/menu/heand.png" class = "kn_instr" id="navig"/></a></div>' +
					'<br>' +
					'<div id = "pan_instr_z4" class = "pan_instr_zz pan_instr_z_v">' +
						'<a href="#changePoint"><img title="НАНЕСТИ ТОЧЕЧНИЙ ОБЄКТ" src="images/menu/point.png" class = "kn_instr" id="drawPoint"/></a></div>' +
					'<div id = "pan_instr_z5" class = "pan_instr_zz pan_instr_z_n">' +
						'<a href="#changeLine"><img title="НАНЕСТИ ЛІНІЙНИЙ ОБЄКТ" src="images/menu/line.png" class = "kn_instr" id="drawLine"/></a></div>' +
					'<br>'+
					'<div id = "pan_instr_z6" class = "pan_instr_zz pan_instr_z_nv">' +
						'<a href="#changeRedator"><img title = "РЕДАГУВАТИ ПАРАМЕТРИ ОБЄКТА" src="images/menu/redact.png" class = "kn_instr" id="red_obj"/></a></div>' +
							'<div id = "panel_redactor" class = "inVisible">' +
								'<div id = "pan_instr_z61" class = "pan_instr_zz">'+
									'<a href="#changeDrag"><img title="ЗМІНИТИ ПОЛОЖЕННЯ" src="images/menu/drag.png" class = "kn_instr" id="dragr"/></a></div>' +
								'<div id = "pan_instr_z62" class = "pan_instr_zz">' +
									'<a href="#changeRotate"><img title="ВРАЩАТИ" src="images/menu/rotate.png" class = "kn_instr" id="rotater"/></a></div>' +
								'<div id = "pan_instr_z63" class = "pan_instr_zz">' +
									'<a href="#changeAttrib"><img title="РЕДАГУВАТИ АТРИБУТИВНУ ІНФОРМАЦІЮ" src="images/menu/infr.png" class = "kn_instr" id="atribr"/></a></div>' +
								'<div id = "pan_instr_z64" class = "pan_instr_zz pan_instr_z_n">' +
									'<a href="#changeDelete"><img title="ВИДИЛИТИ ОБЄКТ" src="images/menu/delete.png" class = "kn_instr" id="deleter"/></a></div>'+
							'</div>'+
					'<br>' +
					'<div id = "pan_instr_z7" class = "pan_instr_zz pan_instr_z_v">' +
						'<a href="#changeInform"><img title="ОТРИМАТИ ІНФОРМАЦІЮ ПО ОБЄКТУ" src="images/menu/inform.png" class = "kn_instr" id="inform"/></a></div>' +
					'<div id = "pan_instr_z8" class = "pan_instr_zz pan_instr_z_n">' +
						'<a href="#changeMesure"><img title="ВИМІРЯТИ ДОВЖИНУ" src="images/menu/mesur.png" class = "kn_instr" id="mesure"/></a></div>' +
			'</div>'	
				);
		  
		$('.pan_instr_zz').data("fl", 0);
		$('.pan_instr_zzz').data("fl", 0);
	
	$('#pan_instr').on('click', 'div', function(evt) {
		var z = map.getZoom();
		var id = evt.target.id;
		if (id == 'pan_instr_masht_ind') {return false};
		if (id == 'zoom_in') {
			map.zoomTo(z+1); 
			return true;
		}
		if (id == 'zoom_out') {
			map.zoomTo(z-1);
			return true;
		}
		
		if (id == 'layer') {
			
			if (olS.fl == 0) {
				methods.setLayer();
				return true;
				} else {
					
					//$('#pan_instr_z0').data("fl", 0).css({'background-color': 'rgba(138, 176, 204, 0.5)'});
					return true;
				}
		}
				
		if (id == 'navig') {
			methods.setNavigation();
		};
		
		if (id == 'drawPoint') {
			methods.setDrawpoint();
			if ( $('#panel').data('fl') == "0" ) {
				
				//Kdeaktivator();
				//$('#panel').pInstr('show'); return true;
			}
		};
		
		if (id == 'drawLine') {
			methods.setDrawLine();
		};
		
		if (id == 'red_obj') {
			if ($('#panel_redactor').is(":visible") == true) {return false};
				$(this).css({'background-color': 'rgba(138, 276, 204, 0.9)'}).data("fl", 1);
				//Kdeaktivator();
				$('#pan_instr_z6').removeClass("pan_instr_z_nv").addClass("pan_instr_z_v");
		
				$('#panel_redactor').fadeIn(100); fl_red = 0; return false;
		};
		if (id == 'dragr') {
			methods.setDrag();
		};
		if (id == 'rotater') {
			methods.setRotate();
		};
		if (id == 'deleter') {
			methods.setDelete();
		};
		if (id == 'atribr') {
			methods.setAtrib();
		};
		if (id == 'inform') {
			methods.setInform();
		};
		if (id == 'mesure') {
			methods.setMesure();
		};
	})
	
	//-------------
	$('#pan_instr').on('mouseenter', 'div', function(event) {
		
		if (event.target.id == 'pan_instr_masht_ind') {return false};
			var fl = $(this).data("fl");
			if (fl == 0) {
			$(this).css({'background-color': 'rgba(138, 176, 204, 0.95)'});
			}
		})
	
		$('#pan_instr').on('mouseleave', 'div', function(event) {
			var fl = $(this).data("fl");
			if (fl == 0) {
				$(this).css({'background-color': 'rgba(138, 176, 204, 0.5)'});
			}
		})		

    },
		
		setLayer: function() {
			Kdeaktivator();
			$('#pan_instr_z0').css({'background-color': 'rgba(138, 276, 204, 0.9)'}).data("fl", 1);
			olS.maximizeControl(); olS.fl = 1; 
			return this;
		},
		setNavigation: function() {
			Kdeaktivator();
			$('#pan_instr_z3').css({'background-color': 'rgba(138, 276, 204, 0.9)'}).data("fl", 1);
			return this;
		},
		setDrawpoint: function() { 
			Kdeaktivator();
			$('#pan_instr_z4').css({'background-color': 'rgba(138, 276, 204, 0.9)'}).data("fl", 1);
			return this;
		},
		setDrawLine: function() { 
			Kdeaktivator();
			$('#pan_instr_z5').css({'background-color': 'rgba(138, 276, 204, 0.9)'}).data("fl", 1);
			return this;
		},
		setDrag: function() { 
			Kdeaktivator();
			$('#pan_instr_z6 img').attr('src', 'images/menu/drag.png');
			$('#pan_instr_z6').css({'background-color': 'rgba(138, 276, 204, 0.9)'}).data("fl", 1);
			return this;
		},
		setRotate : function() { 
			Kdeaktivator();
			$('#pan_instr_z6 img').attr('src', 'images/menu/rotate.png');
			$('#pan_instr_z6').css({'background-color': 'rgba(138, 276, 204, 0.9)'}).data("fl", 1);
			return this;
		},
		setDelete: function() { 
			Kdeaktivator();
			$('#pan_instr_z6 img').attr('src', 'images/menu/delete.png');
			$('#pan_instr_z6').css({'background-color': 'rgba(138, 276, 204, 0.9)'}).data("fl", 1);
			return this;
		},
		setAtrib: function() { 
			Kdeaktivator();
			$('#pan_instr_z6 img').attr('src', 'images/menu/infr.png');
			$('#pan_instr_z6').css({'background-color': 'rgba(138, 276, 204, 0.9)'}).data("fl", 1);
			return this;
		},
		setInform: function() { 
			Kdeaktivator();
			$('#pan_instr_z7').css({'background-color': 'rgba(138, 276, 204, 0.9)'}).data("fl", 1);
			return this;
		},
		setMesure: function() { 
			Kdeaktivator();
			$('#pan_instr_z8').css({'background-color': 'rgba(138, 276, 204, 0.9)'}).data("fl", 1);
			return this;
		}
			
	};
  
  
    $.fn.menu = function( method ) {
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