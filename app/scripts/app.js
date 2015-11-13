



	angular.module('App', ['ui.router']).
		config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			
			.state('layer', {
				url:'/layer',
				resolve: { title: {t: 'My Contacts'} },
				onEnter: function(title){
					alert(title.t);
					//olS.maximizeControl();
					
				}
				
			})
			.state('zp', {
				url:'/zp',
				onEnter: function(){
					
				}
				
			})
			.state('zm', {
				url:'/zm',
				onEnter: function(){
					
				}
				
			})
			.state('navig', {
				url:'/navig',
				
				
			})
			.state('drawpoint', {
				url:'/drawpoint',
				onEnter: function(){
					
				}
				
			})
			.state('drawline', {
				url:'/drawline',
				onEnter: function(){
					
				}
				
			})
			.state('drag', {
				url:'/drag',
				onEnter: function($stateParams){
					 $stateParams.state="drag";
				}
				
			})
			.state('rotatter', {
				url:'/rotatter',
				onEnter: function($stateParams){
					 $stateParams.state="rottater";
				}
				
			})
			.state('attrib', {
				url:'/attrib',
				onEnter: function($stateParams){
					 $stateParams.state="attrib";
				}
			})
			.state('deleter', {
				url:'/deleter',
				onEnter: function($stateParams){
					 $stateParams.state="deleter";
				}
			})
			.state('inform', {
				url:'/inform',
				onEnter: function(){
					
				}
			})
			.state('messure', {
				url:'/messure',
				onEnter: function(){
					
				}
			})
				
	})
	.controller('NavigationCtrl', function ($scope, $location, routpar) {
		

	});

		