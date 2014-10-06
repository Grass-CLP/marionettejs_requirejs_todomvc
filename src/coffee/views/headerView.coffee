define [
	'jquery'
	'underscore'
	'marionette'
	'text!templates/header.html'
], ($, _, Marionette, headerTemp) ->
	'use strict'

	HeaderView = Marionette.ItemView.extend
		template: _.template(headerTemp)
		ui:
			input: "#new-todo"
		events:
			'keypress #new-todo': 'onInputKeypress'
		onInputKeypress: (e) ->
			ENTER_KEY = 13
			todoText = @ui.input.val().trim()

			if e.which == ENTER_KEY && todoText
				@collection.create {title: todoText}
				@ui.input.val('')

	HeaderView
