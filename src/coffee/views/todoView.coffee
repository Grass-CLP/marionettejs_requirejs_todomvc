define [
	'jquery'
	'underscore'
	'marionette'
	'text!templates/todoItem.html'
], ($, _, Marionette, todoTemp) ->
	'use strict'

	TodoView = Marionette.ItemView.extend
		tagName: 'li'
		template: _.template(todoTemp)
		ui:
			edit: '.edit'
		events:
			'click .destroy': 'deleteModel'
			'dblclick label': 'onEditClick'
			'keydown .edit': 'onEditKeypress'
			'focusout .edit': 'onEditFocusout'
			'click .toggle': 'toggle'

		modelEvents:
			'change': 'render'

		onRender: ->
			@$el.removeClass('active completed')
			if @model.isCompleted()
				@$el.addClass('completed')
			else
				@$el.addClass('active')
			return

		deleteModel: ->
			@model.destroy()
			return

		toggle: ->
			@model.toggle().save()
			return

		onEditClick: ->
			@$el.addClass('editing')
			@ui.edit.focus()
			@ui.edit.val(@ui.edit.val())
			return

		onEditFocusout: ->
			todoText = @ui.edit.val().trim()
			if todoText
				@model.set('title', todoText).save()
				@$el.removeClass('editing')
			else
				@destroy()
			return

		onEditKeypress: (e) ->
			ENTER_KEY = 13
			ESC_KEY = 27

			if e.which == ENTER_KEY
				@onEditFocusout()
				return
			if e.which == ESC_KEY
				@ui.edit.val(@model.get('title'))
				@$el.removeClass('editing')
				return

	return TodoView
