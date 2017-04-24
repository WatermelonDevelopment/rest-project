//Dentro de app.js:
var app = angular.module('taller', ['ngRoute']);

app.config(function($routeProvider, $httpProvider) {
	
	// Loading
	
	$httpProvider.interceptors.push(function($q) {
		return {
			request: function(req){
				showSpinner();
				return req;
			},
			response: function(res){
				hideSpinner();
				return res;
			},
			responseError : function(rejection, sd) {
				hideSpinner();
				return $q.reject(rejection);
			}
		};
	});
	
	// L

	$routeProvider.when('/clientes/nuevo', {

					templateUrl : 'views/clientes-nuevo.html',
					controller : 'NuevoclienteController'

	            }).when('/clientes/buscar', {
			
					templateUrl : 'views/clientes-busqueda.html',
					controller : 'BuscarclienteController'

	            }).when('/clientes/:clientid/busqueda', {
			
					templateUrl : 'views/clientes-mostrar.html',
					controller : 'ClienteController'




	            }).when('/vehiculos/nuevo', {
			
					templateUrl : 'views/vehiculos-nuevo.html',
					controller : 'NuevovehiculoController'

	            }).when('/vehiculos/buscar', {
			
					templateUrl : 'views/vehiculos-busqueda.html',
					controller : 'BuscarvehiculoController'

	            }).when('/vehiculos/:carid/busqueda', {
			
					templateUrl : 'views/vehiculos-mostrar.html',
					controller : 'VehiculoController'
			

	            }).when('/empleados/nuevo', {

	        		templateUrl : 'views/empleados-nuevo.html',
	        		controller : 'NuevoempleadoController'

	        	}).when('/empleados/buscar', {

	        		templateUrl : 'views/empleados-busqueda.html',
	        		controller : 'BuscarempleadoController'

	        	}).when('/empleados/:employeid/busqueda', {

	        		templateUrl : 'views/empleados-mostrar.html',
	        		controller : 'EmpleadoController'

	            });

});