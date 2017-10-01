import Sequelize from 'sequelize'

export default function (sequelize) {
  return sequelize.define('lineData', {
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
