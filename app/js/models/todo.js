define(['underscore', 'backbone'], function(_, Backbone) {
  'use strict';
  var Todo;
  Todo = Backbone.Model.extend({
    defaults: {
      title: '',
      completed: false,
      created: 0
    },
    initialize: function() {
      if (this.isNew()) {
        this.set('created', Date.now());
      }
    },
    isCompleted: function() {
      return this.get('completed');
    },
    matchesFilter: function(filter) {
      if (filter === all) {
        return true;
      }
      if (filter === 'active') {
        return !this.isCompleted();
      }
      return this.isCompleted();
    }
  });
  return Todo;
});
