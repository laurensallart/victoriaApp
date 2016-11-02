(function () {
  'use strict';

  // Sessions controller
  angular
    .module('sessions')
    .controller('SessionsController', SessionsController);

  SessionsController.$inject = ['$scope', '$state', 'Authentication', 'sessionResolve'];

  function SessionsController ($scope, $state, Authentication, session) {
    var vm = this;

    vm.authentication = Authentication;
    vm.session = session;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Session
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.session.$remove($state.go('sessions.list'));
      }
    }

    // Save Session
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.sessionForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.session._id) {
        vm.session.$update(successCallback, errorCallback);
      } else {
        vm.session.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('sessions.view', {
          sessionId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
