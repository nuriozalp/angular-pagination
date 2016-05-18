/**
 * Created by nuri on 13.05.2016.
 */

angular.module('safirDepoApp')
    .directive('ngPagination', function () {
        return {
            restrict: 'EA',
            scope:{
                pageSize:'=',
                activePage:'=',
                maxPageSize:'=',
                onPageChange:'&'
            },
            replace: true,
            templateUrl :'view/pagination/pagination.html',
            controller: function($scope) {
                var scope= $scope;
                $scope.paginationItems= [];
                console.log('');
                $scope.onPageChange();

                initializePagination();

                scope.$watch("maxPageSize",function(newValue,oldValue) {
                    scope.activePage=1;
                    //$scope.maxPageSize=newValue;
                    initializePagination();
                });
                scope.$watch("activePage",function(newValue,oldValue) {

                    scope.activePage=newValue;
                    scope.onPageChange();

                    //initializePagination();
                });


                function pager(page, totalPages) {
                    var leftBoundry = Math.max(1, page - 2);
                    var rightBoundry = Math.min(totalPages, page + 2);
                    var emptyRight = 2 - (rightBoundry - page);
                    var emptyLeft = 2 - (page - leftBoundry);

                    leftBoundry = Math.max(1, leftBoundry - emptyRight);
                    rightBoundry = Math.min(totalPages, rightBoundry + emptyLeft);

                    for (var i = leftBoundry; i <= rightBoundry; i++) {
                        $scope.paginationItems.push(i);
                    }
                }

                function initializePagination() {
                   // $scope.onPageChange();
                    $scope.paginationItems.splice(0);
                    pager($scope.activePage,$scope.maxPageSize );
                }

                scope.changePage=function(pageNumber){
                   
                    scope.activePage=pageNumber;
                   // scope.onPageChange();
                   initializePagination();
                };

                scope.firstPage=function(){
                    scope.activePage=1;
                    //scope.onPageChange();
                    initializePagination();
                };

                scope.lastPage=function(){
                    scope.activePage=scope.maxPageSize;
                   // scope.onPageChange();
                    initializePagination();
                };

                scope.prevPage=function(){

                    scope.activePage--;
                    if (scope.activePage<1) scope.activePage=1;
                   // scope.onPageChange();
                    initializePagination();
                };

                scope.nextPage=function(){
                    scope.activePage++;
                    //scope.onPageChange();
                    if (scope.activePage>scope.maxPageSize)
                        scope.activePage=scope.maxPageSize;
                    initializePagination();
                };


            }
        };
    });