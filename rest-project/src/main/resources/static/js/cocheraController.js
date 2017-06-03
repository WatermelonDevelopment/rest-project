app.controller('BuscarcocherasController', function($scope, $http) {

    $scope.searchParams = {};
    $scope.cars = {};
    $scope.firstSearchDefault = true;

    $scope.init = function () {

        $http.get("/cochera/")
            .then(function (response) {
                console.log (response);
                $scope.slots = response.data;
            });    
    }
    
   $scope.search = function() {

        $http.post("https://www.w3schools.com/angular/customers_mysql.php", searchParams)
            .then(function (response) {
                console.log (response);
                $scope.slots = response.data.records;
            });    
    }

    $scope.clearResults = function() {
        $scope.firstSearchDefault = false;
    }
});