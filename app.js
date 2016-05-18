var myApp = angular.module('myApp',[]);

myApp.controller('myPagination', ['$scope', function($scope) {
   $scope.pageSize=10;
 $scope.activePage=1;
 $scope.maxPageSize=5;

 $scope.changePage=function(){
     $scope.list();
    };

}]);

