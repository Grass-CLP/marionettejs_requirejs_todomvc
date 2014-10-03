define [
	'jquery'
	'underscore'
	'marionette'
	'app'
	'collections/todoList'
	'views/todoView'
	'text!templates/todoListComposite.html'
], ($, _, Marionette, App, TodoList, TodoView, todoListTemp) ->
	'use strict'

	TodoListView = Marionette.CompositeView.extend
		template: _.template(todoListTemp)
		childView: TodoView
		childViewContainer: '#todo-list'
		ui:
			toggle: '#toggle-all'
		events
			'click #toggle-all': 'onToggleAllClick'
		collectionEvents:
			'all': 'update'
		initialize: () ->
			@listenTo(App.request('filterState'), 'change:filter', @render, @)
			return

		addChild: (child) ->
			filteredOn = App.request('filterState').get('filter')
			if child.matchesFilter(filteredOn)
				Marionette.CompositeView.prototype.addChild.apply(@, arguments)
			return

		onRender: ->
			@update()
			return

		update: ->
			reduceCompleted = (left, right) ->
				left && right.get('completed')
			allCompleted = @collection.reduce(reduceCompleted, true)
			@ui.toggle.prop('checked', allCompleted)
			@$el.parent().toggle(!!@collection.length)

		onToggleAllClick: (e) ->
			isChecked = e.currentTarget.checked
			@collection.each(todo) ->
				todo.save {'completed': isChecked}
				return
			return

	return TodoListView
