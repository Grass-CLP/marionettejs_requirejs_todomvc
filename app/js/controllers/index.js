define(['marionette', 'collections/todoList', 'views/headerView', 'views/footerView', 'views/todoListView', 'require'], function(Marionette, TodoList, HeaderView, FooterView, TodoListView, require) {
  'use strict';
  var Controller;
  Controller = Marionette.Controller.extend({
    todoList: new TodoList(),
    start: function() {
      this.showHeader(this.todoList);
      this.showFooter(this.todoList);
      this.showTodoList(this.todoList);
      this.todoList.fetch();
    },
    showHeader: function(todoList) {
      var app, header;
      app = require('app');
      header = new HeaderView({
        collection: todoList
      });
      app.header.show(header);
    },
    showFooter: function(todoList) {
      var app, footer;
      app = require('app');
      footer = new FooterView({
        collection: todoList
      });
      app.footer.show(footer);
    },
    showTodoList: function(todoList) {
      var app, todoListView;
      app = require('app');
      todoListView = new TodoListView({
        collection: todoList
      });
      app.main.show(todoListView);
    },
    filterItems: function(filter) {
      var app, newFilter;
      app = require('app');
      newFilter = filter && filter.trim() || 'all';
      app.request('filterState').set('filter', newFilter);
    }
  });
  return Controller;
});
