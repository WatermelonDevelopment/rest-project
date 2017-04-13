//Dentro de controllers.js:

/// CLIENTE CONTROLLERS
    app.controller('NuevoclienteController', function($scope) {

    });

    app.controller('BuscarclienteController', function($scope, $http) {

        $scope.searchParams = {};

        $scope.search = function() {

            $http.post("https://www.w3schools.com/angular/customers_mysql.php", searchParams)
                .then(function (response) {
                    console.log (response);
                    $scope.customers = response.data.records;
                });    

        }

        $scope.clearResults = function() {
            $scope.customers = null;
        }


    });

    /*app.controller('ListadoclienteController', function($scope, $http, $routeParams) {
        $http.get(API_URL + "/cliente/listado")
            .then(function (response) {
                $scope.customers = response.data.records;
            });
    });*/

    app.controller('ClienteController', function($scope, $routeParams) {
        $scope.clientid = $routeParams.clientid
    });
/// CLIENTE CONTROLLERS



/// VEHICULOS CONTROLLERS
    app.controller('NuevovehiculoController', function($scope) {


    });

    app.controller('BuscarvehiculoController', function($scope) {


    });

    app.controller('ListadovehiculoController', function($scope) {


    });

    app.controller('VehiculoController', function($scope, $routeParams) {
        $scope.vehiculoid = $routeParams.vehiculoid
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