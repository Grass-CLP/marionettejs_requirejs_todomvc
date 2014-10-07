define [
	'jquery'
	'underscore'
	'marionette'
	'require'
	'text!templates/footer.html'
], ($, _, Marionette, require, footerTemp) ->
	'use strict'

	FooterView = Marionette.ItemView.extend
		template: _.template(footerTemp)
		ui:
			filters: '#filters a'
			completed: '.completed a'
			active: '.active a'
			all: '.all a'
			summary: '#todo-count'
		events:
			'click #clear-completed': 'onClearClick'
		collectionEvents:
			'all': 'render'
		getApp: ->
			require('app')
		initialize: ->
			@listenTo(@getApp().request('filterState'), 'change:filter', @updateFilterSelection, @)
			return
		serializeData: ->
			active = @collection.getActive().length
			total = @collection.length
			{
				activeCount: active
				totalCount: total
				completedCount: total - active
			}
		onRender: ->
			@$el.parent().toggle(@collection.length > 0)
			@updateFilterSelection()
			return

		updateFilterSelection: ->
			@ui.filters.removeClass('selected')
			@ui[@getApp().request('filterState').get('filter')].addClass('selected')
			return

		onClearClick: ->
			completed = @collection.getCompleted()
			completed.forEach ((todo) ->
				todo.destroy()
			)
			return

	FooterView
