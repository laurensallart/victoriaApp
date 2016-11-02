'use strict';

angular.module('core')
.controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours(14);
      d.setMinutes(0);
      $scope.mytime = d;
    };

    $scope.changed = function () {
    };

    $scope.clear = function() {
      $scope.mytime = null;
    };

    $scope.myDate = new Date();
    $scope.dateTime = new Date();
    $scope.minDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() - 2,
      $scope.myDate.getDate());
    $scope.maxDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() + 2,
      $scope.myDate.getDate());
    $scope.onlyWeekendsPredicate = function(date) {
      var day = date.getDay();
      return day === 0 || day === 6;
    };
    
  }
]);
