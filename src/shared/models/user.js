import Sequelize from 'sequelize'

export default function (sequelize) {
  return sequelize.define('user', {
    platform: {
      type: Sequelize.ENUM('line'),
      allowNull: false
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  })
}
