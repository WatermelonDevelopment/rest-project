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
    $scope.originalSlot = {};
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
	        	$scope.originalSlot = response.data;
	        	
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
    	$http.post("/vehiculo/", $scope.car)
        .then(function (response) {
        	 console.log (response);
        	 var cochera = $scope.car.cochera
             $scope.car = response.data;
        	 var originalCar = cochera.vehiculo
        	 cochera.vehiculo = $scope.car;
        	 if($scope.originalSlot.id != cochera.id) {
    		
        		 	var message = 'Esta seguro que desea realizar este cambio?\n' 
        		 		+  $scope.car.marca + ' ' + $scope.car.modelo + ' dominio '
        		 		+ $scope.car.patente + ' a cochera ' + cochera.planta
        		 		+ '-' + cochera.numero;
        		 	if(originalCar != undefined) {
        		 		message += '\nLa cochera ' + cochera.planta 
        		 		+ '-' + cochera.numero 
        		 		+ ' está ocupada por ' + originalCar.marca + ' ' 
        		 		+ originalCar.modelo + ' y se pasará a la cochera '
        		 		+ $scope.slot.planta + '-' + $scope.slot.numero;
        		 	}
        		 	var r = confirm(message);
        		 	if (r == true) {
			             $http.post("/cochera/guardarEnrocar", cochera)
				              .then(function (response) {
				        	 console.log (response);
				         
				         });    
        		 	}
        	 }
        	 $location.path("/cocheras/buscar");
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
		$http.get("/cochera/" + floor + "/cocherasLibres").then(function(response) {
			console.log(response);
			$scope.slots = response.data;
		});
	}
        
    $scope.create = function() {
        var validated = false;
    	var resultValidations = 'Verifique los siguientes campos: '
    		
    	var patente = $scope.car.patente;
    	if (patente.length < 2) {
        	resultValidations += " - Patente invalido";
        }
    	var brand = $scope.car.marca;
    	if (brand.length < 2) {
        	resultValidations += " - Marca invalido";
        }
    	var model = $scope.car.modelo;
        if (model.length < 0) {
        	resultValidations += " - Modelo invalido";
        }
    	if (resultValidations == 'Verifique los siguientes campos: ') {
    		validated = true;
    	}
    	
    	$scope.car.cliente = $scope.customer;
    	if (validated == true) {
    	
	        $http.post("/vehiculo/", $scope.car)
		        .then(function (response) {
		        	 console.log (response);
		        	 var cochera = $scope.car.cochera
		             $scope.car = response.data;
		        	 cochera.vehiculo = $scope.car;
		             $http.post("/cochera/guardar", cochera)
			              .then(function (response) {
			        	 console.log (response);
		             $location.path("clientes/" + $scope.customer.id + "/mostrar");
		         });    
    	    });
    	} else {
            $scope.alert = { show: true, 
                    type: "alert-warning", 
                    message: resultValidations, 
                    link: "", 
                    text: ""
                  };        		
    	}
    	}
    
    
//    $scope.cancelEdit = function() {
//    	alert('Hola');
//    }
});