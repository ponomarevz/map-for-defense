'use strict';

angular.module('App')
	.controller('olMapController', function ($scope, $olMap, blInitService, $state, $stateParams, tematikLayerInit, instrServ) {
		var map = $olMap.map;
		map.addLayers(blInitService);	
		
				var  hesh_poley_pdr = { 
						"id": {"name": "ID", "status": "slugbova", "type": "text", "minLength": 0, "maxLength": 15, "dataType": "int", "def": "",
								"nota":""},
						"name": {"name": "Назва", "status": "zagalna", "type": "text", "minLength": 2, "maxLength": 15, "dataType": "text", "def": "",
								"nota":"Введіть назву обєкту (тест кирилицею 0-5 літер)", "regE": "^[а-яіїє]"}, 
						"nvps": {"name": "Керівник", "status": "zagalna", "type": "text", "minLength": 0, "maxLength": 150, "dataType": "text", "def": "",
								"nota":"Введіть прізвище керівника (текст кирилецею 0-15 літер)"},
						"nuzel": {"name": "Номер вузла", "status": "zagalna", "type": "text", "minLength": 4, "maxLength": 4, "dataType": "int", "def": "",
								"nota":"Введіть номер вузла (ифри 4)", "regE": "^[0-9]"},
						"ahref": {"name": "Колір", "status": "izobr", "type": "kolor", "minLength": 0, "maxLength": 15, "dataType": "text", "def": "",
								"nota":"Виберіть колір симвролу"},
						"angle": {"name": "Угол повертання", "status": "slugbova", "type": "text", "minLength": 0, "maxLength": 15, "dataType": "text", "def": "",
								"nota":""},
						"img_source": {"name": "Обладнання", "status": "slugbova", "type": "text", "minLength": 0, "maxLength": 15, "dataType": "text", "def": "",
								"nota":""},
						"notatku": {"name": "Нотатки", "status": "zagalna", "type": "textarea", "minLength": 0, "maxLength": 150, "dataType": "text", "def": "",
								"nota":"Опешіть обїект(Текст довільні літери до 150 літер)"},
						"instr": {"name": "Інструмент", "status": "slugbova", "type": "text", "minLength": 0, "maxLength": 15, "dataType": "text", "def": "",
								"nota":""},
						"log_izm": {"name": "Лог змін", "status": "slugbova", "type": "text", "minLength": 0, "maxLength": 15, "dataType": "text", "def": "",
								"nota":""},
						"masht": {"name": "Відображати з рівня", "status": "izobr", "type": "text", "minLength": 0, "maxLength": 2, "dataType": "text", "def": "",
								"nota":"Виберіть масштабний рівень з якого відображати символ"},
						"bH": {"name": "Розмір", "status": "izobr", "type": "text", "minLength": 0, "maxLength": 2, "dataType": "text", "def": "25",
								"nota":"Задайте розмір символу (Цифри від 25/30/35/40/50)"},
						"fl_c": {"name": "Флаг центрирования", "status": "izobr", "type": "text", "minLength": 0, "maxLength": 1, "dataType": "text", "def": "0",
								"nota":"Задайте 2"}
					};	
				
				var  hesh_poley_line = { 
						"name": {"name": "Назва", "status": "zagalna", "type": "text", "minLength": 0, "maxLength": 50, "dataType": "text", "def": ""}, 
						"with": {"name": "Товщина лінії", "status": "izobr", "type": "select", "minLength": 0, "maxLength": 150, "dataType": "Line_width", "def": ""},
						"type": {"name": "Тип лінії", "status": "izobr", "type": "select", "minLength": 0, "maxLength": 4, "dataType": "Line_type", "def": ""},
						"color": {"name": "Колір лінії", "status": "izobr", "type": "kolor", "minLength": 0, "maxLength": 15, "dataType": "text", "def": ""},
						"opacity": {"name": "Прозорість", "status": "izobr", "type": "slider", "minLength": 0, "maxLength": 15, "dataType": "text", "def": ""},
						"type_skl_geom": {"name": "Вид геометрії", "status": "izobr", "type": "select", "minLength": 0, "maxLength": 15, "dataType": "Skl_geom", "def": ""},
						"skl_geom_L_with": {"name": "Товщина додаткової лінії", "status": "izobr", "type": "select", "minLength": 0, "maxLength": 150, "dataType": "Line_width", "def": ""},
						"skl_geom_L_type": {"name": "Тип додаткової лінії", "status": "izobr", "type": "select", "minLength": 0, "maxLength": 4, "dataType": "Line_type", "def": ""},
						"skl_geom_L_color": {"name": "Колір додатковї лінії", "status": "izobr", "type": "kolor", "minLength": 0, "maxLength": 15, "dataType": "text", "def": ""},
						"skl_geom_L_opacity": {"name": "Прозорість додаткової лінії", "status": "izobr", "type": "slider", "minLength": 0, "maxLength": 15, "dataType": "text", "def": ""},
					    "skl_geom_L_paralel": {"name": "Паралельний зсув додаткової лінії", "status": "izobr", "type": "text", "minLength": 0, "maxLength": 15, "dataType": "text", "def": ""},
						"inform": {"name": "Нотатки", "status": "zagalna", "type": "textarea", "minLength": 0, "maxLength": 150, "dataType": "text", "def": ""},
						"log_izm": {"name": "Лог змін", "status": "slugbova", "type": "text", "minLength": 0, "maxLength": 15, "dataType": "text", "def": ""},
						"masht": {"name": "Відображати з рівня", "status": "zagalna", "type": "text", "minLength": 0, "maxLength": 2, "dataType": "text", "def": ""}
					};	
		
		
				instrServ.getInstr().then(function(res){
						console.log(res);
						var l = tematikLayerInit.layerInit("point", "Точкові обекті", "http://10.246.2.194/proxi.php/wfsauth", "pdr", hesh_poley_pdr);
						var b = tematikLayerInit.layerInit("line", "Лінійні обїекти", "http://10.246.2.194/proxi.php/wfsauth", "line", hesh_poley_line);
						console.log(l.layer);
						map.addLayers([l.layer, b.layer]);
						
				});
			
			
			
			
			
		function stateChange() {
			var konvert = encodeURI(map.baseLayer.name);
			
			var param = {
				layer:konvert.replace(/%/g, "."),
				zoom: map.getZoom(),
				lon: map.getCenter().lon,
				lat: map.getCenter().lat
			};
			if ($stateParams.state === "navig") { $state.go("navigate.navig", param); }
			if ($stateParams.state === "layer") { $state.go("navigate.layer", param); }
		}
		map.events.on({"moveend": stateChange});
		
});    