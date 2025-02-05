const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  chat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sender_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_sender: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  message_data: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Message;
