'use strict'
	angular.module('App').
		service('routpar', function() {
			var state;
			this.setState = function(st) {
				state = st;
			};
			this.getState = function() {
				return state;
			}
		});