define(['jquery', 'underscore', 'marionette', 'text!templates/todoItem.html'], function($, _, Marionette, todoTemp) {
  'use strict';
  var TodoView;
  TodoView = Marionette.ItemView.extend({
    tagName: 'li',
    template: _.template(todoTemp),
    ui: {
      edit: '.edit'
    },
    events: {
      'click .destroy': 'deleteModel',
      'dblclick label': 'onEditClick',
      'keydown .edit': 'onEditKeypress',
      'focusout .edit': 'onEditFocusout',
      'click .toggle': 'toggle'
    },
    modelEvents: {
      'change': 'render'
    },
    onRender: function() {
      this.$el.removeClass('active completed');
      if (this.model.isCompleted()) {
        this.$el.addClass('completed');
      } else {
        this.$el.addClass('active');
      }
    },
    deleteModel: function() {
      this.model.destroy();
    },
    toggle: function() {
      this.model.toggle().save();
    },
    onEditClick: function() {
      this.$el.addClass('editing');
      this.ui.edit.focus();
      this.ui.edit.val(this.ui.edit.val());
    },
    onEditFocusout: function() {
      var todoText;
      todoText = this.ui.edit.val().trim();
      if (todoText) {
        this.model.set('title', todoText).save();
        this.$el.removeClass('editing');
      } else {
        this.destroy();
      }
    },
    onEditKeypress: function(e) {
      var ENTER_KEY, ESC_KEY;
      ENTER_KEY = 13;
      ESC_KEY = 27;
      if (e.which === ENTER_KEY) {
        this.onEditFocusout();
        return;
      }
      if (e.which === ESC_KEY) {
        this.ui.edit.val(this.model.get('title'));
        this.$el.removeClass('editing');
      }
    }
  });
  return TodoView;
});
