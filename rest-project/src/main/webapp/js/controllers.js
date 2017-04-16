//Dentro de controllers.js:

/// CLIENTE CONTROLLERS
    app.controller('NuevoclienteController', function($scope, $http) {

        $scope.alert = { show: false };
        $scope.customer = {};

        $scope.create = function() {

            $http.post("http://localhost:8089/cliente/", $scope.customer)
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

        }

    });

    app.controller('BuscarclienteController', function($scope, $http) {

        $scope.searchParams = {};
        $scope.customers = {};
        $scope.firstSearchDefault = true;

        $scope.init = function () {

            $http.get("http://localhost:8089/cliente/")
                .then(function (response) {
                    console.log (response);
                    $scope.customers = response.data;
                });    

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

        $scope.init = function () {

            $http.get("http://localhost:8089/cliente/" + $customerid)
                .then(function (response) {
                    console.log (response);
                    $scope.customer = response.data;
                });    

        }

        $scope.save = function() {

            $http.post("http://localhost:8089/cliente/", $scope.customer)
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
/// CLIENTE CONTROLLERS



/// VEHICULOS CONTROLLERS
    app.controller('NuevovehiculoController', function($scope, $http) {
        
        $scope.alert = { show: false };
        $scope.car = {};

        $scope.create = function() {

            $http.post("http://localhost:8089/vehiculo/", $scope.car)
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

        }

    });

    app.controller('BuscarvehiculoController', function($scope, $http) {

        $scope.searchParams = {};
        $scope.cars = {};
        $scope.firstSearchDefault = true;

        $scope.init = function () {

            $http.get("http://localhost:8089/vehiculo/")
                .then(function (response) {
                    console.log (response);
                    $scope.cars = response.data;
                });    

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

            $http.get("http://localhost:8089/vehiculo/" + $carid)
                .then(function (response) {
                    console.log (response);
                    $scope.car = response.data;
                });    

        }

        $scope.save = function() {

            $http.post("http://localhost:8089/vehiculo/", $scope.car)
                .then(function (response) {
                    console.log (response);
                    $scope.car = response.data;

                    $scope.alert = { show: true, 
                                     type: "alert-success", 
                                     message: "Vehiculo actualizado correctamente.", 
                                     link: "vehiculos/buscar", 
                                     text: "Ver listado"
                                   };
                });    

        }
    });
/// VEHICULOS CONTROLLERS



/// EMPLEADOS CONTROLLERS
    app.controller('NuevoempleadoController', function($scope) {


    });

    app.controller('BuscarempleadoController', function($scope) {


    });

    app.controller('ListadoempleadoController', function($scope) {


    });

    app.controller('EmpleadoController', function($scope, $routeParams) {
        $scope.empleadoid = $routeParams.empleadoid
    });
/// EMPLEADOS CONTROLLERS