import Sequelize from 'sequelize'

export default function (sequelize) {
  return sequelize.define('userLineData', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    lineUserId: {
      type: Sequelize.STRING(191), // ユニーク制約に夜文字数制限
      allowNull: false,
      unique: true
    }
  })
}
