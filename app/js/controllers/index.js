define(['marionette', 'collections/todoList', 'views/headerView', 'views/footerView', 'views/todoListView', 'app'], function(Marionette, TodoList, HeaderView, FooterView, TodoListView, app) {
  'use strict';
  var Controller;
  Controller = Marionette.Controller.extend({
    start: function() {
      this.todoList = new TodoList();
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
      app.header.show(header);
    },
    showFooter: function(todoList) {
      var footer;
      footer = new FooterView({
        collection: todoList
      });
      app.footer.show(footer);
    },
    showTodoList: function(todoList) {
      var todoListView;
      todoListView = new TodoListView({
        collection: todoList
      });
      app.main.show(todoListView);
    },
    filterItems: function(filter) {
      var newFilter;
      newFilter = filter && filter.trim() || 'all';
      app.request('filterState').set('filter', newFilter);
    }
  });
  return Controller;
});
