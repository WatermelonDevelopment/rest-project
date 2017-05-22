//Dentro de app.js:
var app = angular.module('taller', ['ngRoute']);

app.factory('DateTimeService', function() {
	
    var date = new Date(); 
    var day = date.getDate()
    var month = date.getMonth()+1;
    day = day < 10 ? '0'+day : day;
    month = month < 10 ? '0'+month : month;
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	
	var dateTime = day + "/" + month + "/" + date.getFullYear() + " " + strTime;
	
	return {
	   'date' : day + "/" + month + "/" + date.getFullYear(),
	   'hour' : strTime,
	   'datetime' : dateTime
	};
});

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

	            }).when('/clientes/:clientid/mostrar', {
			
					templateUrl : 'views/clientes-mostrar.html',
					controller : 'ClienteController'
						
	            }).when('/clientes/:clientid/modificar', {
	    			
					templateUrl : 'views/clientes-modificar.html',
					controller : 'ClientemodificarController'
				
	            }).when('/clientes/:clientid/vehiculos', {
	    			
					templateUrl : 'views/clientes-vehiculos.html',
					controller : 'ClientevehiculosController'



	            }).when('/vehiculos/:customerid/nuevo', {
			
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