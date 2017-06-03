app.controller('ClientedescuentosController', function($scope, $http, $routeParams, DateTimeService) {
    
    $customerid = $routeParams.clientid;
    $scope.alert = { show: false };
    $scope.customer = {};
    $scope.discount = {};

    $scope.init = function () {

    	
        $http.get("/cliente/" + $customerid)
            .then(function (response) {
                console.log (response);
                $scope.customer = response.data;
            });   
    }

    $scope.create = function() {

    	$scope.discount.cliente = $scope.customer;
        $http.post("/descuento/", $scope.discount)
            .then(function (response) {
                console.log (response);
                $scope.discount = response.data;

                $scope.alert = { show: true, 
                                 type: "alert-success", 
                                 message: "Descuento creado correctamente.", 
                                 link: "clientes/" + $scope.customer.id + "/mostrar", 
                                 text: "Ver cliente"
                               };
            });    
    }
});