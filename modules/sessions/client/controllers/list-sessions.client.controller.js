(function () {
  'use strict';

  angular
    .module('sessions')
    .controller('SessionsListController', SessionsListController);

  SessionsListController.$inject = ['SessionsService'];

  function SessionsListController(SessionsService) {
    var vm = this;

    vm.sessions = SessionsService.query();
  }
})();
