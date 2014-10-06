define(['jquery', 'underscore', 'marionette', 'app', 'text!templates/footer.html'], function($, _, Marionette, App, footerTemp) {
  'use strict';
  var FooterView;
  FooterView = Marionette.ItemView.extend({
    template: _.template(footerTemp),
    ui: {
      filters: '#filters a',
      completed: '.completed a',
      active: '.active a',
      all: '.all a',
      summary: '#todo-count'
    },
    events: {
      'click #clear-completed': 'onClearClick'
    },
    collectionEvents: {
      'all': 'render'
    },
    initialize: function() {
      this.listenTo(App.request('filterState'), 'change:filter', this.updateFilterSelection, this);
    },
    serializeData: function() {
      var active, total;
      active = this.collection.getActive().length;
      total = this.collection.length;
      return {
        activeCount: active,
        totalCount: total,
        completedCount: total - active
      };
    },
    onRender: function() {
      this.$el.parent().toggle(this.collection.length > 0);
      this.updateFilterSelection();
    },
    updateFilterSelection: function() {
      this.ui.filters.removeClass('selected');
      this.ui[App.request('filterState').get('filter')].addClass('selected');
    },
    onClearClick: function() {
      var completed;
      completed = this.collection.getCompleted();
      completed.forEach((function(todo) {
        return todo.destroy();
      }));
    }
  });
  return FooterView;
});
