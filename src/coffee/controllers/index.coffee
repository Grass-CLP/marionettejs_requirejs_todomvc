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
		start: ->
			@showHeader @todoList
			@showFooter @todoList
			@showTodoList @todoList
			@todoList.fetch()
			return

		showHeader: (todoList) ->
			app = require('app')
			header = new HeaderView {
				collection: todoList
			}
			app.header.show header
			return

		showFooter: (todoList) ->
			app = require('app')
			footer = new FooterView {
				collection: todoList
			}
			app.footer.show footer
			return

		showTodoList: (todoList) ->
			app = require('app')
			todoListView = new TodoListView {
				collection: todoList
			}
			app.main.show todoListView
			return

		filterItems: (filter) ->
			app = require('app')
			newFilter = filter && filter.trim() || 'all'
			app.request('filterState').set('filter', newFilter)
			return

	}

	Controller
