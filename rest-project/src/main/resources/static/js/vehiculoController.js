app.controller('BuscarvehiculoController', function($scope, $http) {

    $scope.searchParams = {};
    $scope.cars = {};
    $scope.firstSearchDefault = true;
    $scope.init = function () {

        $http.get("/vehiculo/")
            .then(function (response) {
                console.log (response);
                $scope.cars = response.data;
            });    
    }
    
    $scope.delete = function (vehiculo) {
    	
    	var r = confirm('Esta seguro que desea eliminar el vehiculo ' + vehiculo.marca + ' ' + vehiculo.modelo + ' dominio ' + vehiculo.patente + '?');
    	if (r == true) {
    		$.ajax({
    		    url: '/vehiculo/' + vehiculo.id,
    		    type: 'DELETE',
    		    success: function(response) {
    		        // Do something with the result
    		    	console.log (response);
    		    	$scope.init();
    		    }
    		});
    	}
    }

    $scope.clearResults = function() {
        $scope.firstSearchDefault = false;
    }


});

app.controller('VehiculoController', function($scope, $http, $routeParams, $location) {

    $carid = $routeParams.carid;
    $scope.alert = { show: false };
    $scope.car = {};
    $scope.floors = [];
    $scope.slots = [];
    $scope.init = function () {

        $http.get("/vehiculo/" + $carid)
            .then(function (response) {
                console.log (response);
                $scope.car = response.data;
                
            });
        $http.get("/vehiculo/" + $carid + "/cochera")
	        .then(function (response) {
	        	console.log (response);
	        	var cochera = response.data;
	        	
	        	$http.get("/cochera/plantas").then(function(response) {
	        		console.log(response);
	        		$scope.floors = response.data;
	        		$scope.car.planta =  cochera.planta;
	        		
	        		$http.get("/cochera/" + $scope.car.planta + "/cocheras").then(function(response) {
	        			console.log(response);
	        			$scope.slots = response.data;
	        			$scope.car.cochera = cochera;
	        		});
	        	});
	        });
    }
    
//    $scope.save = function() {
////{$scope.car,$scope.car.cochera}
//    	var asignacion = {
//    		"vehiculo":$scope.car,
//    		"idCochera":$scope.car.cochera
//    	}
//    		
//        $http.post("/vehiculo/update", asignacion)
//            .then(function (response) {
//            	 console.log (response);
//                 $scope.car = response.data;
//                 $location.path("clientes/" + $scope.car.cliente.id + "/mostrar");
//            });    
//
//    }
    
    $scope.save = function() {
        $http.post("/vehiculo/", $scope.car)
	        .then(function (response) {
	        	 console.log (response);
	        	 var cochera = $scope.car.cochera
	             $scope.car = response.data;
	             $http.post("/cochera/guardarEnrocar", cochera)
		              .then(function (response) {
		        	 console.log (response);
	             $location.path("clientes/" + $scope.car.cliente.id + "/mostrar");
		         });    
    	    });
    }
    $scope.cancelEdit = function() {
    	$location.path("clientes/" + $scope.car.cliente.id + "/mostrar");
    }
    $scope.getslots = function(floor) {
		$http.get("/cochera/" + floor + "/cocheras").then(function(response) {
			console.log(response);
			$scope.slots = response.data;
		});
	}

});

app.controller('vehiculosAltaController', function($scope, $http, $routeParams, DateTimeService, $location) {
    
    $customerid = $routeParams.clientid;
    $scope.alert = { show: false };
    $scope.customer = {};
    $scope.car = {};
    $scope.floors = {};
    $scope.slots = {};
    

    $scope.init = function () {

    	$scope.car.fechaDeIngreso = DateTimeService.datetime;

		$http.get("/cliente/" + $customerid).then(function(response) {
			console.log(response);
			$scope.customer = response.data;
		});

		$http.get("/cochera/plantas").then(function(response) {
			console.log(response);
			$scope.floors = response.data;
		});
	}

	$scope.getslots = function(floor) {
		$http.get("/cochera/" + floor + "/cocheras").then(function(response) {
			console.log(response);
			$scope.slots = response.data;
		});
	}
        
    $scope.create = function() {

    	$scope.car.cliente = $scope.customer;
        $http.post("/vehiculo/", $scope.car)
        .then(function (response) {
            console.log (response);
            $scope.car = response.data;
            $location.path("clientes/" + $scope.customer.id + "/mostrar");
        });    
    }
    
//    $scope.cancelEdit = function() {
//    	alert('Hola');
//    }
});