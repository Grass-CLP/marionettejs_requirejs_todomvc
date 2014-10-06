define [
	'marionette'
], (Marionette) ->
	'use strict'

	Router = Marionette.AppRouter.extend {
		appRoutes:
			'*filter': 'filterItems'
	}

	Router
