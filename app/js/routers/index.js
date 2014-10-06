define(['marionette'], function(Marionette) {
  'use strict';
  var Router;
  Router = Marionette.AppRouter.extend({
    appRoutes: {
      '*filter': 'filterItems'
    }
  });
  return Router;
});
