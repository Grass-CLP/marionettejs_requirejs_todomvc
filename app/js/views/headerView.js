define(['jquery', 'underscore', 'marionette', 'text!templates/header.html'], function($, _, Marionette, headerTemp) {
  'use strict';
  var HeaderView;
  HeaderView = Marionette.ItemView.extend({
    template: _.template(headerTemp),
    ui: {
      input: "#new-todo"
    },
    events: {
      'keypress #new-todo': 'onInputKeypress'
    },
    onInputKeypress: function(e) {
      var ENTER_KEY, todoText;
      ENTER_KEY = 13;
      todoText = this.ui.input.val().trim();
      if (e.which === ENTER_KEY && todoText) {
        this.collection.create({
          title: todoText
        });
        return this.ui.input.val('');
      }
    }
  });
  return HeaderView;
});
