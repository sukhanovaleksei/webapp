import Sequelize from 'sequelize'

import config from '../config/config.json'
import { ENV } from '../config'
import { Users } from './users.model'

const sequelize = new Sequelize(config[ENV].database, config[ENV].username, config[ENV].password, {
	host: config[ENV].hostname,
	dialect: config[ENV].dialect,
	operatorsAliases: 0,
	logging: false,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
})

const db = {
	Sequelize,
	sequelize,
	users: Users(sequelize, Sequelize)
}

export default db