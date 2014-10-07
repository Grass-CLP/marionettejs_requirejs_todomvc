define(['jquery', 'underscore', 'marionette', 'require', 'views/todoView', 'text!templates/todoListComposite.html'], function($, _, Marionette, require, TodoView, todoListTemp) {
  'use strict';
  var TodoListView;
  TodoListView = Marionette.CompositeView.extend({
    template: _.template(todoListTemp),
    childView: TodoView,
    childViewContainer: '#todo-list',
    ui: {
      toggle: '#toggle-all'
    },
    events: {
      'click #toggle-all': 'onToggleAllClick'
    },
    collectionEvents: {
      'all': 'update'
    },
    getApp: function() {
      return require('app');
    },
    initialize: function() {
      this.listenTo(this.getApp().request('filterState'), 'change:filter', this.render, this);
    },
    addChild: function(child) {
      var filteredOn;
      filteredOn = this.getApp().request('filterState').get('filter');
      if (child.matchesFilter(filteredOn)) {
        Marionette.CompositeView.prototype.addChild.apply(this, arguments);
      }
    },
    onRender: function() {
      this.update();
    },
    update: function() {
      var allCompleted, reduceCompleted;
      reduceCompleted = function(left, right) {
        return left && right.get('completed');
      };
      allCompleted = this.collection.reduce(reduceCompleted, true);
      this.ui.toggle.prop('checked', allCompleted);
      return this.$el.parent().toggle(!!this.collection.length);
    },
    onToggleAllClick: function(e) {
      var isChecked;
      isChecked = e.currentTarget.checked;
      this.collection.each(todo)(function() {
        todo.save({
          'completed': isChecked
        });
      });
    }
  });
  return TodoListView;
});
