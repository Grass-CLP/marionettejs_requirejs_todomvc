define(['underscore', 'backbone', 'localstorage', 'models/todo'], function(_, Backbone, Store, Todo) {
  'use strict';
  var TodoList;
  TodoList = Backbone.Collection.extend({
    model: Todo,
    localStorage: new Store('todos-backbone-marionette'),
    getCompleted: function() {
      return this.filter(this._isCompleted);
    },
    getActive: function() {
      return this.reject(this._isCompleted);
    },
    _isCompleted: function(todo) {
      return todo.isCompleted();
    }
  });
  return TodoList;
});
