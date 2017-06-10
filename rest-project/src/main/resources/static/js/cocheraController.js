app.controller('BuscarcocherasController', function($scope, $http) {

    $scope.searchParams = {};
    $scope.cars = {};
    $scope.firstSearchDefault = true;

    $scope.init = function () {

        $http.get("/cochera/paginado/1/5")
            .then(function (response) {
                console.log (response);
                $scope.slots = response.data;
            });    
    }
    
    $scope.clearResults = function() {
        $scope.firstSearchDefault = false;
    }
});

app.controller('cocheraController', function($scope, $http, $routeParams) {
		$slotid = $routeParams.slotid;
		$scope.alert = { show: false };
		$scope.slot = {};
		$scope.init = function () {
		
		    $http.get("/cochera/" + $slotid)
		        .then(function (response) {
		            console.log (response);
		            $scope.slot = response.data;
		        });   
		}
});