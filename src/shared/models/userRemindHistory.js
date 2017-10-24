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
    isConfirmed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    answer: {
      type: Sequelize.BOOLEAN
    }
  })
}
