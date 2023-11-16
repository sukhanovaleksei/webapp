import db from '../models'

export const update = async (req, res) => {
	let transaction = await db.sequelize.transaction({
		autocommit: false,
		isolationLevel: db.Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
	})
	try {
		const user = await db.users.findOne({
			where: {
				id: req.body.userId
			},
			transaction,
			lock: {
				level: db.Sequelize.Transaction.LOCK.NO_KEY_UPDATE,
				of: db.users
			}
		})
		await user.update({ balance: user.balance - req.body.amount }, { transaction })
		await transaction.commit()
		res.status(200).json({ message: 'Successfully updated.' })
	} catch (err) {
		await transaction.rollback()
		res.status(500).json({ message: `Something went wrong: ${err.message}` })
	}
}