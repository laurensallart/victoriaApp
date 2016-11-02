//Sessions service used to communicate Sessions REST endpoints
(function () {
  'use strict';

  angular
    .module('sessions')
    .factory('SessionsService', SessionsService);

  SessionsService.$inject = ['$resource'];

  function SessionsService($resource) {
    return $resource('api/sessions/:sessionId', {
      sessionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
