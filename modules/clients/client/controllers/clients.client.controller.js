(function () {
  'use strict';

  // Clients controller
  angular
    .module('clients')
    .controller('ClientsController', ClientsController);

  ClientsController.$inject = ['$scope', '$state', 'Authentication', 'clientResolve'];

  function ClientsController ($scope, $state, Authentication, client) {
    var vm = this;

    vm.authentication = Authentication;
    vm.client = client;
    if (!vm.client.birthdate) {
      vm.client.birthdate = new Date();
    }
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.show_error_message = false;

    // Remove existing Client
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.client.$remove($state.go('clients.list'));
      }
    }

    // Save Client
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.clientForm');
        vm.show_error_message = true;
        return false;
      }
      else {
        vm.show_error_message = false;
      }

      // TODO: move create/update logic to service
      if (vm.client._id) {
        vm.client.$update(successCallback, errorCallback);
      } else {
        vm.client.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('clients.view', {
          clientId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
