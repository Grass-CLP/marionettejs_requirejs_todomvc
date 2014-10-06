define [
	'backbone'
	'marionette'
	'routers/index'
	'controllers/index'
], (Backbone, Marionette, Router, Controller) ->
	'use strict'

	app = new Marionette.Application()

	app.addInitializer( ->
		router = new Router {
			controller: new Controller()
		}
	)

	app.addRegions {
		header: '#header'
		main: '#main'
		footer: '#footer'
	}

	app.on 'start', ->
		Backbone.history.start()
		return

	return Window.app = app
