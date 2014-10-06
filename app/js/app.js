define(['backbone', 'marionette', 'routers/index', 'controllers/index'], function(Backbone, Marionette, Router, Controller) {
  'use strict';
  var app;
  app = new Marionette.Application();
  app.addInitializer(function() {
    var router;
    return router = new Router({
      controller: new Controller()
    });
  });
  app.addRegions({
    header: '#header',
    main: '#main',
    footer: '#footer'
  });
  app.on('start', function() {
    Backbone.history.start();
  });
  return Window.app = app;
});
