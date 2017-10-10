import Sequelize from 'sequelize'

export default function (sequelize) {
  return sequelize.define('userlineData', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    lineUserId: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
}
