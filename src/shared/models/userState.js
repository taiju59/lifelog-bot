import Sequelize from 'sequelize'

export default function (sequelize) {
  return sequelize.define('userState', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    argument: {
      type: Sequelize.STRING
    }
  })
}
