(function () {
  'use strict';

  angular
    .module('sessions')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Sessions',
      state: 'sessions',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'sessions', {
      title: 'List Sessions',
      state: 'sessions.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'sessions', {
      title: 'Create Session',
      state: 'sessions.create',
      roles: ['user']
    });
  }
})();
