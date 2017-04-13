//Dentro de app.js:
var app = angular.module('taller', ['ngRoute']);

app.config(function($routeProvider, $httpProvider) {

	$routeProvider.when('/clientes/nuevo', {

		templateUrl : 'views/clientes-nuevo.html',
		controller : 'NuevoclienteController'

	            }).when('/clientes/buscar', {

		templateUrl : 'views/clientes-busqueda.html',
		controller : 'BuscarclienteController'

	            }).when('/clientes/listado', {

		templateUrl : 'views/clientes-listado.html',
		controller : 'ListadoclienteController'

	            }).when('/clientes/:clientid/busqueda', {

		templateUrl : 'views/clientes-mostrar.html',
		controller : 'ClienteController'




	            }).when('/vehiculos/nuevo', {

		templateUrl : 'views/vehiculos-nuevo.html',
		controller : 'NuevovehiculoController'

	            }).when('/vehiculos/buscar', {

		templateUrl : 'views/vehiculos-busqueda.html',
		controller : 'BuscarvehiculoController'

	            }).when('/vehiculos/listado', {

		templateUrl : 'views/vehiculos-listado.html',
		controller : 'ListadovehiculoController'

	            }).when('/vehiculos/:vehiculoid/busqueda', {

		templateUrl : 'views/vehiculos-mostrar.html',
		controller : 'VehiculoController'




	            }).when('/empleados/nuevo', {

		templateUrl : 'views/empleados-nuevo.html',
		controller : 'NuevoempleadoController'

				}).when('/empleados/buscar', {

		templateUrl : 'views/empleados-busqueda.html',
		controller : 'BuscarempleadoController'

				}).when('/empleados/listado', {

		templateUrl : 'views/empleados-listado.html',
		controller : 'ListadoempleadoController'

				}).when('/empleados/:empleadoid/busqueda', {

		templateUrl : 'views/empleados-mostrar.html',
		controller : 'EmpleadoController'

	            });

});