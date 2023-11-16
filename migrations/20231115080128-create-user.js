import Sequelize from 'sequelize'

export const up = async ({ context: queryInterface }) => {
	await queryInterface.createTable('users', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		balance: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				min: 0
			}
		}
	})

	await queryInterface.insert(null, 'users', { id: 1, balance: 10000 })
}

export const down = async ({ context: queryInterface }) => {
	await queryInterface.dropTable('users')
}