/* ================= alta Cliente ===================================================
 * 
 */

app.controller('NuevoclienteController', function($scope, $http) {

    $scope.alert = { show: false };
    $scope.customer = { };
    resultValidations = '';
    
    $scope.create = function() {      	
    	if ($scope.customerForm.$valid) {
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

/* ================= Buscar Cliente ===================================================
 * 
 */

app.controller('BuscarclienteController', function($scope, $http) {

    $scope.searchParams = {};
    // $scope.customers = {};
    $scope.firstSearchDefault = false;

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
    		    	console.log (response);
    		    	$scope.init();
    		    }
    		});
    	}
    }

    $scope.search = function() {

        $http.post("/cliente/buscar", $scope.searchParams)
            .then(function (response) {
                console.log (response);
                $scope.customers = response.data;
                $scope.firstSearchDefault = true;
            });    

    }

    $scope.clearResults = function() {
        // $scope.customers = null;
        $scope.firstSearchDefault = false;
    }


});

/* ================= Ver Cliente ===================================================
 * 
 */

app.controller('ClienteController', function($scope, $http, $routeParams) {
 
    $customerid = $routeParams.clientid;
    $scope.alert = { show: false };
    $scope.customer = {};
    $scope.cars = {};
    $scope.discounts = {};
    $scope.payslip = {};

    $scope.init = function () {

        $http.get("/cliente/" + $customerid)
            .then(function (response) {
                console.log (response);
                $scope.customer = response.data;
            });    
        
        $http.get("/cliente/" + $customerid + "/vehiculos")
            .then(function (response) {
                console.log (response);
                
                var log = [];
                angular.forEach(response.data, function(value, key) {
	                  // alert(key + ': ' + value.id);
	                  $http.get("/vehiculo/" + value.id + "/cochera")
	                  .then(function (responseC) {
	                      console.log (responseC);
	                      response.data[key].cochera = responseC.data;
	                  });    
                }, log);
                
                $scope.cars = response.data;
            });
        $http.get("/cliente/" + $customerid + "/descuentos")
            .then(function (response) {
                console.log (response);
                                
                $scope.discounts = response.data;
            });
        $http.get("/cliente/" + $customerid + "/liquidacion")
        .then(function (response) {
            console.log (response);
                            
            $scope.payslip = response.data;
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
    	}
    }
    
    $scope.discountdelete = function (descuento) {
    	
    	var r = confirm('Esta seguro que desea eliminar el descuento?');

    	if (r == true) {
    		$.ajax({
    		    url: '/descuento/' + descuento.id,
    		    type: 'DELETE',
    		    success: function(response) {
    		        // Do something with the result
    		    	console.log (response);
    		    	$scope.init();
    		    }
    		});
    	}
    }
    
    $scope.pagarFactura = function (idFactura) {
    	
    	var r = confirm('Esta seguro que desea registrar el pago');

    	if (r == true) {
    		$.ajax({
    		    url: '/liquidacion/' + idFactura + '/pagar',
    		    type: 'POST',
    		    success: function() {
    		        // Do something with the result
    		    	console.log (idFactura);
    		    	$scope.init();
    		    }
    		});
    	}
    	
    }
    
});

/* ================= Editar Cliente ===================================================
 * 
 */
    
app.controller('ClientemodificarController', function($scope, $http, $routeParams) {
    
    $customerid = $routeParams.clientid;
    $scope.alert = { show: false };
    $scope.customer = {};

    $scope.init = function () {

        $http.get("/cliente/" + $customerid)
            .then(function (response) {
                console.log (response);
                $scope.customer = response.data;
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
    
});