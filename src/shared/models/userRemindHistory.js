import Sequelize from 'sequelize'

export default function (sequelize) {
  return sequelize.define('userRemindHistory', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    reminderId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    answer: {
      type: Sequelize.BOOLEAN
    }
  })
}
