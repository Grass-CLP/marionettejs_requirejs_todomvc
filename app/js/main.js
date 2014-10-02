'use strict';
require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery',
    underscore: '../bower_components/underscore/underscore',
    backbone: '../bower_components/backbone/backbone',
    localstorage: '../bower_components/backbone.localStorage/backbone.localStorage',
    marionette: '../bower_components/marionette/lib/backbone.marionette',
    text: '../bower_components/requirejs-text/text'
  },
  shim: {
    localstorage: {
      deps: ['backbone'],
      exports: 'Store'
    }
  }
});

require(['marionette'], function(Marionette) {
  var app;
  app = new Marionette.Application();
  app.onStart = function() {
    return console.log('app start');
  };
  return app.start();
});
