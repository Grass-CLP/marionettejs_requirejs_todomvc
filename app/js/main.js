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

require(['collections/TodoList'], function(TodoList) {
  var list;
  list = new TodoList();
  list.on('add', function(todo) {
    return console.log("title:" + (todo.get('title')));
  });
  list.add({
    title: 'test_hoge'
  });
  return console.log(list);
});
