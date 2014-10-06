define [
	'backbone'
	'marionette'
	'routers/index'
	'controllers/index'
], (Backbone, Marionette, Router, Controller) ->
	'use strict'

	controller = new Controller()
	TodoMVC = Marionette.Application.extend {
		initialize: (options) ->
			console.log options
			@router = new Router {
				controller: controller
			}
			return
	}

	app = new TodoMVC()
	app.addRegions {
		header: '#header'
		main: '#main'
		footer: '#footer'
	}

	app.on 'start', ->
		Backbone.history.start()
		controller.start()
		return

	return Window.app = app
