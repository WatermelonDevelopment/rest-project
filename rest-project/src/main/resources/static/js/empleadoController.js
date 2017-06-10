app.controller('NuevoempleadoController', function($scope, $http, DateTimeService, $location) {
        
    $scope.alert = { show: false };
    $scope.employe = { 'nombre': '', 'apellido': '', 'telefono': '', 'celular': '', 'domicilio': ''};
    
    $scope.init = function() {
    	$scope.employe.fechaIngreso = DateTimeService.datetime;
    }

    $scope.create = function() {

    	// validaciones temp
    	var validated = false;
    	var resultValidations = 'Verifique los siguientes campos: '
    		
    	var name = $scope.employe.nombre;
    	if (name.length < 3) {
        	resultValidations += " - Nombre invalido";
        }
    	var lname = $scope.employe.apellido;
    	if (lname.length < 3) {
        	resultValidations += " - Apellido invalido";
        }
    	var phone = $scope.employe.telefono;
        if (isNaN(phone) || phone.length < 5) {
        	resultValidations += " - Telefono invalido";
        }
    	var mphone = $scope.employe.celular;
        if (isNaN(mphone) || mphone.length < 5) {
        	resultValidations += " - Celular invalido";
        }
    	var street = $scope.employe.domicilio;
    	if (street.length < 3) {
        	resultValidations += " - Domicilio invalido";
        }
    	if (resultValidations == 'Verifique los siguientes campos: ') {
    		validated = true;
    	}
    	
    	if (validated == true) {
            $http.post("/empleado/", $scope.employe)
                .then(function (response) {
                	 console.log (response);
                     $scope.employe = response.data;
                     $location.path("empleados/buscar");
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

});

app.controller('BuscarempleadoController', function($scope, $http) {

    $scope.searchParams = {};
    $scope.employes = {};
    $scope.firstSearchDefault = true;

    $scope.init = function () {

        $http.get("/empleado/")
            .then(function (response) {
                console.log (response);
                $scope.employes = response.data;
            });    
    }
    
    $scope.delete = function (empleado) {
    	
    	var r = confirm('Esta seguro que desea eliminar al empleado ' + empleado.apellido + ', ' + empleado.nombre + '?');

    	if (r == true) {
    		$.ajax({
    		    url: '/empleado/' + empleado.id,
    		    type: 'DELETE',
    		    success: function(response) {
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

app.controller('EmpleadoController', function($scope, $http, $routeParams, $location) {

    $employeid = $routeParams.employeid;
    $scope.alert = { show: false };
    $scope.employe = {};
    $scope.init = function () {

        $http.get("/empleado/" + $employeid)
            .then(function (response) {
                console.log (response);
                $scope.employe = response.data;
            });    
    }

    $scope.save = function() {

        $http.post("/empleado/", $scope.employe)
            .then(function (response) {
            	 console.log (response);
                 $scope.employe = response.data;
                 $location.path("empleados/buscar");
            });    
    }
});