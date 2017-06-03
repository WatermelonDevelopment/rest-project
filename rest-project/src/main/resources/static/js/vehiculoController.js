app.controller('NuevovehiculoController', function($scope, $http, $routeParams, DateTimeService) {
        
    $scope.alert = { show: false };
    $scope.car = { 'marca': '', 'modelo': '', 'patente': ''};
    
    $scope.init = function() {
      $scope.car.customerid = $routeParams.customerid
	  $scope.car.fechaDeIngreso = DateTimeService.datetime
    }
    
    $scope.create = function() {

    	// validaciones temp
    	var validated = false;
    	var resultValidations = 'Verifique los siguientes campos: '
    		
    	var name = $scope.car.marca;
    	if (name.length < 3) {
        	resultValidations += " - Marca invalida";
        }
    	var model = $scope.car.modelo;
    	if (model.length < 3) {
        	resultValidations += " - Modelo invalido";
        }
    	var domain = $scope.car.patente;
    	if (domain.length < 3) {
        	resultValidations += " - Patente invalido";
        }
    	if (resultValidations == 'Verifique los siguientes campos: ') {
    		validated = true;
    	}
    	
    	if (validated == true) {
            $http.post("/vehiculo/", $scope.car)
                .then(function (response) {
                    console.log (response);
                    $scope.car = response.data;

                    $scope.alert = { show: true, 
                    	type: "alert-success", 
                    	message: "Vehiculo creado correctamente con el numero "+ $scope.car.id +".", 
                    	link: "vehiculos/" + $scope.car.id + "/busqueda", 
                    	text: "Ver vehiculo"
                   };
                });   
    	} else {
            $scope.alert = {
            		show: true, 
                    type: "alert-warning", 
                    message: resultValidations, 
                    link: "", 
                    text: ""
           };        		
    	}
    }

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

    $scope.search = function() {

        $http.post("https://www.w3schools.com/angular/customers_mysql.php", searchParams)
            .then(function (response) {
                console.log (response);
                $scope.customers = response.data.records;
            });    

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

    $scope.save = function() {

        $http.post("/vehiculo/", $scope.car)
            .then(function (response) {
                console.log (response);
                $scope.car = response.data;
                $scope.alert = { show: true, 
                	type: "alert-success", 
                	message: "Vehiculo actualizado correctamente.", 
                	link: "clientes/" + $scope.car.cliente.id + "/busqueda", 
                	text: "Ver cliente"
               };
            });    
    }
});