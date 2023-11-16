import { config } from 'dotenv'

config()

export const PORT = parseInt(process.env.PORT),
	ENV = ['development', 'test', 'production'].includes(process.env.ENV) ? process.env.ENV : 'development'