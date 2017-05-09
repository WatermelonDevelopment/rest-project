//Dentro de controllers.js:

/// CLIENTE CONTROLLERS
    app.controller('NuevoclienteController', function($scope, $http, DateTimeService) {

        $scope.alert = { show: false };
        $scope.customer = { 'nombre': '', 'apellido': '', 'telefono': '', 'domicilio': ''};
    
        $scope.init = function() {
		  $scope.customer.fechaIngreso = DateTimeService.datetime
        }

        $scope.create = function() {
        	
        	// validaciones temp
        	var validated = false;
        	var resultValidations = 'Verifique los siguientes campos: '
        		
        	var name = $scope.customer.nombre;
        	if (name.length < 3) {
            	resultValidations += " - Nombre invalido";
            }
        	var lname = $scope.customer.apellido;
        	if (lname.length < 3) {
            	resultValidations += " - Apellido invalido";
            }
        	var phone = $scope.customer.telefono;
            if (isNaN(phone) || phone.length < 5) {
            	resultValidations += " - Telefono invalido";
            }
        	var street = $scope.customer.domicilio;
        	if (street.length < 3) {
            	resultValidations += " - Domicilio invalido";
            }
        	if (resultValidations == 'Verifique los siguientes campos: ') {
        		validated = true;
        	}
        	
        	//
        	
        	if (validated == true) {
	            $http.post("/cliente/", $scope.customer)
	                .then(function (response) {
	                    console.log (response);
	                    $scope.customer = response.data;
	
	                    $scope.alert = { show: true, 
	                                     type: "alert-success", 
	                                     message: "Cliente creado correctamente con el numero "+ $scope.customer.id +".", 
	                                     link: "clientes/" + $scope.customer.id + "/busqueda", 
	                                     text: "Ver cliente"
	                                   };
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

    app.controller('BuscarclienteController', function($scope, $http) {

        $scope.searchParams = {};
        $scope.customers = {};
        $scope.firstSearchDefault = true;

        $scope.init = function () {

            $http.get("/cliente/")
                .then(function (response) {
                    console.log (response);
                    $scope.customers = response.data;
                });    

        }
        
        $scope.delete = function (user) {
        	
        	var r = confirm('Esta seguro que desea eliminar a ' + user.apellido + ', ' + user.nombre + '?');

        	if (r == true) {
        		$.ajax({
        		    url: '/cliente/' + user.id,
        		    type: 'DELETE',
        		    success: function(response) {
        		        // Do something with the result
        		    	console.log (response);
        		    	$scope.init();
        		    }
        		});
	            /*$http.delete("/cliente/" + user.id)
	                .then(function (response) {
	                    console.log (response);
	                    $scope.init();
	                });
	           */
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
            //$scope.customers = null;
            $scope.firstSearchDefault = false;
        }


    });

    app.controller('ClienteController', function($scope, $http, $routeParams) {
     
        $customerid = $routeParams.clientid;
        $scope.alert = { show: false };
        $scope.customer = {};
        $scope.cars = {};

        $scope.init = function () {

            $http.get("/cliente/" + $customerid)
                .then(function (response) {
                    console.log (response);
                    $scope.customer = response.data;
                });    
            
            $http.get("/cliente/" + $customerid + "/vehiculos")
	            .then(function (response) {
	                console.log (response);
	                $scope.cars = response.data;
	            });    
            

        }

        $scope.save = function() {

            $http.post("/cliente/", $scope.customer)
                .then(function (response) {
                    console.log (response);
                    $scope.customer = response.data;

                    $scope.alert = { show: true, 
                                     type: "alert-success", 
                                     message: "Cliente actualizado correctamente.", 
                                     link: "clientes/buscar", 
                                     text: "Ver listado"
                                   };
                });    

        }
        
        $scope.cardelete = function (vehiculo) {
        	
        	var r = confirm('Esta seguro que desea eliminar el vehiculo?');

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
	            /*$http.delete("/empleado/" + empleado.id)
	                .then(function (response) {
	                    console.log (response);
	                    $scope.init();
	                });
	           */
        	}
        	
        }
        
    });
    
    app.controller('ClientevehiculosController', function($scope, $http, $routeParams, DateTimeService) {
        
        $customerid = $routeParams.clientid;
        $scope.alert = { show: false };
        $scope.customer = {};
        $scope.car = {};

        $scope.init = function () {

        	$scope.car.fechaDeIngreso = DateTimeService.datetime
//            $http.get("/vehiculo/" + $carid)
//                .then(function (response) {
//                    console.log (response);
//                    $scope.car = response.data;
//                });    
        	
            $http.get("/cliente/" + $customerid)
	            .then(function (response) {
	                console.log (response);
	                $scope.customer = response.data;
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
                                     link: "clientes/" + $scope.customer.id + "/busqueda", 
                                     text: "Ver cliente"
                                   };
                });    

        }
        
    });
/// CLIENTE CONTROLLERS



/// VEHICULOS CONTROLLERS
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
        	
        	//
        	
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
                $scope.alert = { show: true, 
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
	            /*$http.delete("/vehiculo/" + vehiculo.id)
	                .then(function (response) {
	                    console.log (response);
	                    $scope.init();
	                });
	           */
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
            //$scope.customers = null;
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
/// VEHICULOS CONTROLLERS



/// EMPLEADOS CONTROLLERS
    app.controller('NuevoempleadoController', function($scope, $http, DateTimeService) {
        
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
        	
        	//
        	
        	if (validated == true) {
	            $http.post("/empleado/", $scope.employe)
	                .then(function (response) {
	                    console.log (response);
	                    $scope.employe = response.data;
	
	                    $scope.alert = { show: true, 
	                                     type: "alert-success", 
	                                     message: "Empleado creado correctamente con el numero "+ $scope.employe.id +".", 
	                                     link: "empleados/" + $scope.employe.id + "/busqueda", 
	                                     text: "Ver empleado"
	                                   };
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
        		        // Do something with the result
        		    	console.log (response);
        		    	$scope.init();
        		    }
        		});
	            /*$http.delete("/empleado/" + empleado.id)
	                .then(function (response) {
	                    console.log (response);
	                    $scope.init();
	                });
	           */
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
            //$scope.customers = null;
            $scope.firstSearchDefault = false;
        }


    });

    app.controller('EmpleadoController', function($scope, $http, $routeParams) {

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

                    $scope.alert = { show: true, 
                                     type: "alert-success", 
                                     message: "Empleado actualizado correctamente.", 
                                     link: "empleados/buscar", 
                                     text: "Ver listado"
                                   };
                });    

        }
    });
/// EMPLEADOS CONTROLLERS