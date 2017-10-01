import Sequelize from 'sequelize'

export default function (sequelize) {
  return sequelize.define('reminder', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    time: {
      type: Sequelize.TIME
    }
  })
}
