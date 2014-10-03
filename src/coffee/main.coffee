'use strict'

require.config
	paths:
		jquery:				'../bower_components/jquery/jquery'
		underscore:			'../bower_components/underscore/underscore'
		backbone:			'../bower_components/backbone/backbone'
		localstorage:		'../bower_components/backbone.localStorage/backbone.localStorage'
		marionette:			'../bower_components/marionette/lib/backbone.marionette'
		text:				'../bower_components/requirejs-text/text'
	shim:
		localstorage:
			deps: ['backbone']
			exports: 'Store'
# コレクションとモデルに問題ないかチェック
require [
	'collections/TodoList'
], (TodoList) ->
	list = new TodoList()
	list.on('add',(todo) ->
		console.log "title:#{todo.get('title')}"
	)
	list.add {title:'test_hoge'}
	console.log list
