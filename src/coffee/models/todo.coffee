define [
	'underscore'
	'backbone'
], (_, Backbone) ->
	'use strict'

	Todo = Backbone.Model.extend
		defaults:
			title: ''
			completed: false
			created: 0

		initialize: ->
			if @isNew()
				@set 'created', Date.now()
			return
		toggle: ->
			@set 'completed', !@isCompleted()

		isCompleted: ->
			@get 'completed'

		matchesFilter: (filter) ->
			if filter == 'all'
				return true
			if filter == 'active'
				return !@isCompleted()
			return @isCompleted()

	return Todo
