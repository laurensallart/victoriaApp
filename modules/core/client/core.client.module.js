'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core', ['ui.bootstrap', 'ngAnimate', 'ngMaterial', 'ngMaterialDatePicker']);
ApplicationConfiguration.registerModule('core.admin', ['core']);
ApplicationConfiguration.registerModule('core.admin.routes', ['ui.router']);
