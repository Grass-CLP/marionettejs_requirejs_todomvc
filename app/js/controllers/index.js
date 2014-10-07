define(['marionette', 'collections/todoList', 'views/headerView', 'views/footerView', 'views/todoListView', 'require'], function(Marionette, TodoList, HeaderView, FooterView, TodoListView, require) {
  'use strict';
  var Controller;
  Controller = Marionette.Controller.extend({
    todoList: new TodoList(),
    getApp: function() {
      return require('app');
    },
    start: function() {
      this.showHeader(this.todoList);
      this.showFooter(this.todoList);
      this.showTodoList(this.todoList);
      this.todoList.fetch();
    },
    showHeader: function(todoList) {
      var header;
      header = new HeaderView({
        collection: todoList
      });
      this.getApp().header.show(header);
    },
    showFooter: function(todoList) {
      var footer;
      footer = new FooterView({
        collection: todoList
      });
      this.getApp().footer.show(footer);
    },
    showTodoList: function(todoList) {
      var todoListView;
      todoListView = new TodoListView({
        collection: todoList
      });
      this.getApp().main.show(todoListView);
    },
    filterItems: function(filter) {
      var newFilter;
      newFilter = filter && filter.trim() || 'all';
      this.getApp().request('filterState').set('filter', newFilter);
    }
  });
  return Controller;
});
