define(['backbone', 'marionette', 'routers/index', 'controllers/index'], function(Backbone, Marionette, Router, Controller) {
  'use strict';
  var TodoMVC, app, controller;
  controller = new Controller();
  TodoMVC = Marionette.Application.extend({
    initialize: function(options) {
      console.log(options);
      this.router = new Router({
        controller: controller
      });
    }
  });
  app = new TodoMVC();
  app.addRegions({
    header: '#header',
    main: '#main',
    footer: '#footer'
  });
  app.on('start', function() {
    Backbone.history.start();
    controller.start();
  });
  return Window.app = app;
});
