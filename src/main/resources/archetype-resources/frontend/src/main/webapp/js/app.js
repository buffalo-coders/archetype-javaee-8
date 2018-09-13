#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

const Controllers = angular.module('Controllers', []);
const Services = angular.module('Services', []);
const App = angular.module('App', [ 'ngMessages', 'ngRoute', 'Controllers', 'Services' ]);

// ---

App.config([ '${symbol_dollar}routeProvider', function(${symbol_dollar}routeProvider) {

	${symbol_dollar}routeProvider.when('/greetings', {
		controller : 'GreetingsController',
		controllerAs : 'ctrl',
		templateUrl : 'greetings.html'
	});

	${symbol_dollar}routeProvider.when('/greetings/new', {
		controller : 'GreetingNewController',
		controllerAs : 'ctrl',
		templateUrl : 'greeting-new.html'
	});

	${symbol_dollar}routeProvider.when('/greetings/:id', {
		controller : 'GreetingController',
		controllerAs : 'ctrl',
		templateUrl : 'greeting.html'
	});

	${symbol_dollar}routeProvider.otherwise({
		redirectTo : '/greetings'
	});

} ]);

// ---

Controllers.controller('GreetingsController', [ '${symbol_dollar}location', 'GreetingsService',
		function(${symbol_dollar}location, GreetingsService) {

			var ctrl = this;

			GreetingsService.getAll().then(function(response) {
				ctrl.greetings = response;
			});

			ctrl.doCreate = function() {
				${symbol_dollar}location.path('/greetings/new');
			}

} ]);

Controllers.controller('GreetingController', [
		'${symbol_dollar}location',
		'${symbol_dollar}routeParams',
		'GreetingsService',
		function(${symbol_dollar}location, ${symbol_dollar}routeParams, GreetingsService) {

			var ctrl = this;

			ctrl.id = ${symbol_dollar}routeParams.id;

			GreetingsService.getById(ctrl.id).then(function(response) {
				ctrl.greeting = response;
			});

			ctrl.doCancel = function() {
				${symbol_dollar}location.path('/greetings');
			}

			ctrl.doDelete = function() {
				GreetingsService.deleteById(ctrl.id).then(function(response) {
					${symbol_dollar}location.path('/greetings');
				});
			}

			ctrl.doUpdate = function() {
				GreetingsService.updateById(ctrl.id, ctrl.greeting).then(
						function(response) {
							${symbol_dollar}location.path('/greetings');
						});
			}

		} ]);

Controllers.controller('GreetingNewController', [ '${symbol_dollar}location',
		'GreetingsService', function(${symbol_dollar}location, GreetingsService) {

			var ctrl = this;

			ctrl.greeting = {};

			ctrl.doCancel = function() {
				${symbol_dollar}location.path('/greetings');
			}

			ctrl.doCreate = function() {
				GreetingsService.create(ctrl.greeting).then(function(response) {
					${symbol_dollar}location.path('/greetings');
				});
			}

		} ]);

// ---

Services.factory('GreetingsService', [ '${symbol_dollar}http', function(${symbol_dollar}http) {

	return {
		'create' : function(greeting) {
			 return ${symbol_dollar}http.post('/api/greetings', greeting).then(function (response) {
				 return response.data;
			 });
		},

		'deleteById' : function(id) {
			 return ${symbol_dollar}http.delete('/api/greetings/' + id).then(function (response) {
				 return response.data;
			 });
		},

		'getAll' : function() {
			 return ${symbol_dollar}http.get('/api/greetings').then(function (response) {
				 return response.data;
			 });
		},

		'getById' : function(id) {
			 return ${symbol_dollar}http.get('/api/greetings/' + id).then(function (response) {
				 return response.data;
			 });
		},

		'updateById' : function(id, greeting) {
			 return ${symbol_dollar}http.put('/api/greetings/' + id, greeting).then(function (response) {
				 return response.data;
			 });
		}
	};

} ]);

// ---
