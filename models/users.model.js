export const Users = (sequelize, Sequelize) => {
	return sequelize.define('users', {
		balance: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				min: 0
			}
		}
	}, {
		timestamps: false
	})
}