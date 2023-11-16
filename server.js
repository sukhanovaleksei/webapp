import express from 'express'
import { urlencoded, json } from 'body-parser'
import http from 'http'
import router from 'xpress-router'
import { Umzug } from 'umzug'

import { PORT } from './config'
import routes from './routes'
import db from './models'

(async () => {
	try {
		const umzug = new Umzug({
			migrations: { glob: 'migrations/*.js' },
			context: db.sequelize.getQueryInterface(),
			logger: console,
		})
		await umzug.up()
		await db.sequelize.sync()

		const app = express()
		app.use(urlencoded({ limit: '500mb', extended: true, parameterLimit: 1000000 }))
		app.use(json({ limit: '500mb' }))

		router(app, routes, { controllerDirectory: `${process.cwd()}/controllers/`, controllerFileSuffix: '-controller.js' })

		const httpServer = http.createServer(app)
		httpServer.listen(PORT, () => {
			console.log(`webapp service is running at http://localhost:${PORT}`)
		})
	} catch (err) {
		console.log('Error: ', err)
		process.exit(500)
	}
})()