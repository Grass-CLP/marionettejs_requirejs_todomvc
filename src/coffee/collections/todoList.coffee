define [
	'underscore'
	'backbone'
	'localstorage'
	'models/todo'
], (_, Backbone, Store, Todo) ->
	'use strict'

	TodoList = Backbone.Collection.extend
		model: Todo
		localStorage: new Store('todos-backbone-marionette')

		getCompleted: ->
			@filter @_isCompleted

		getActive: ->
			@reject @_isCompleted

		_isCompleted: (todo) ->
			todo.isCompleted()


	return TodoList
