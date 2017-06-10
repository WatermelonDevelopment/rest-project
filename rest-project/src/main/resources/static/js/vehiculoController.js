app.controller('NuevovehiculoController', function($scope, $http, $routeParams, DateTimeService) {
        
    
});

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

app.controller('VehiculoController', function($scope, $http, $routeParams) {

    $carid = $routeParams.carid;
    $scope.alert = { show: false };
    $scope.car = {};
    $scope.init = function () {

        $http.get("/vehiculo/" + $carid)
            .then(function (response) {
                console.log (response);
                $scope.car = response.data;
            });    
    }

});

app.controller('vehiculosAltaController', function($scope, $http, $routeParams, DateTimeService) {
    
    $customerid = $routeParams.clientid;
    $scope.alert = { show: false };
    $scope.customer = {};
    $scope.car = {};
    $scope.floors = {};
    $scope.slots = {};

    $scope.init = function () {

    	$scope.car.fechaDeIngreso = DateTimeService.datetime;
//            $http.get("/vehiculo/" + $carid)
//                .then(function (response) {
//                    console.log (response);
//                    $scope.car = response.data;
//                });    

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

            $scope.alert = { show: true, 
            	type: "alert-success", 
            	message: "Vehiculo creado correctamente.", 
            	link: "clientes/" + $scope.customer.id + "/mostrar", 
            	text: "Ver cliente"
           };
        });    
    }
});