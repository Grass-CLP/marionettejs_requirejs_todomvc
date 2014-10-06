define [
	'marionette'
	'collections/todoList'
	'views/headerView'
	'views/footerView'
	'views/todoListView'
	'app'
], (Marionette, TodoList, HeaderView, FooterView, TodoListView, app) ->
	'use strict'

	Controller = Marionette.Controller.extend {
		start: ->
			@todoList = new TodoList()
			# @setTodoList todoList
			@showHeader @todoList
			@showFooter @todoList
			@showTodoList @todoList
			@todoList.fetch()
			return

		# setTodoList: (todoList) ->
		# 	@todoList = todoList
		# 	return

		showHeader: (todoList) ->
			header = new HeaderView {
				collection: todoList
			}
			app.header.show header
			return

		showFooter: (todoList) ->
			footer = new FooterView {
				collection: todoList
			}
			app.footer.show footer
			return

		showTodoList: (todoList) ->
			todoListView = new TodoListView {
				collection: todoList
			}
			app.main.show todoListView
			return

		filterItems: (filter) ->
			newFilter = filter && filter.trim() || 'all'
			app.request('filterState').set('filter', newFilter)
			return

	}

	Controller
