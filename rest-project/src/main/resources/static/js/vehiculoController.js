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
    $scope.slot = {};
    $scope.init = function () {

        $http.get("/vehiculo/" + $carid)
            .then(function (response) {
                console.log (response);
                $scope.car = response.data;
                
            });
        $http.get("/vehiculo/" + $carid + "/cochera")
	        .then(function (response) {
	        	console.log (response);
	        	$scope.slot = response.data;
	        	
	        	$http.get("/cochera/plantas").then(function(response) {
	        		console.log(response);
	        		$scope.floors = response.data;
	        		$scope.car.planta =  $scope.slot.planta;
	        		
	        		$http.get("/cochera/" + $scope.car.planta + "/cocheras").then(function(response) {
	        			console.log(response);
	        			$scope.slots = response.data;
	        			$scope.car.cochera = $scope.slot;
	        		});
	        	});
	        });
    }
    
    $scope.save = function() {
    	var r = confirm('Esta seguro que desea realizar este cambio?\n' 
    			+  $scope.car.marca + ' ' + $scope.car.modelo + ' dominio ' + $scope.car.patente 
    			+ ' a cochera ' 
    			+ $scope.car.cochera.planta + '-' + $scope.car.cochera.numero 
    			+ '\nLa cochera ' + $scope.car.cochera.planta + '-' + $scope.car.cochera.numero 
    			+ 'esta ocupada por ' + $scope.car.cochera.vehiculo.marca + ' ' 
    			+ $scope.car.cochera.vehiculo.modelo + ' y se pasará a la cochera '
    			+ $scope.slot.planta + '-' + $scope.slot.numero);
    	if (r == true) {
	        $http.post("/vehiculo/", $scope.car)
		        .then(function (response) {
		        	 console.log (response);
		        	 var cochera = $scope.car.cochera
		             $scope.car = response.data;
		        	 cochera.vehiculo = $scope.car;
		             $http.post("/cochera/guardarEnrocar", cochera)
			              .then(function (response) {
			        	 console.log (response);
	//	             $location.path("clientes/" + $scope.car.cliente.id + "/mostrar");
			         $location.path("/cocheras/buscar");
		         });    
    	    });
    	}
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