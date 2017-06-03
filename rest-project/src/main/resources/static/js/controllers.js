app.controller('ClientevehiculosController', function($scope, $http, $routeParams, DateTimeService) {
    
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