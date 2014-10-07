define [
	'marionette'
	'collections/todoList'
	'views/headerView'
	'views/footerView'
	'views/todoListView'
	'require'
], (Marionette, TodoList, HeaderView, FooterView, TodoListView, require) ->
	'use strict'

	Controller = Marionette.Controller.extend {
		todoList: new TodoList()
		getApp: ->
			require('app')
		start: ->
			@showHeader @todoList
			@showFooter @todoList
			@showTodoList @todoList
			@todoList.fetch()
			return

		showHeader: (todoList) ->
			header = new HeaderView {
				collection: todoList
			}
			@getApp().header.show header
			return

		showFooter: (todoList) ->
			footer = new FooterView {
				collection: todoList
			}
			@getApp().footer.show footer
			return

		showTodoList: (todoList) ->
			todoListView = new TodoListView {
				collection: todoList
			}
			@getApp().main.show todoListView
			return

		filterItems: (filter) ->
			newFilter = filter && filter.trim() || 'all'
			@getApp().request('filterState').set('filter', newFilter)
			return

	}

	Controller
