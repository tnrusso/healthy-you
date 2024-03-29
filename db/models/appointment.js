const { Sequelize, DataTypes } = require("sequelize");
const db = require("../index");

const appointment = db.define(
  "appointment",
  {
    appointment_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    practice_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    doctor_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    first_name:{
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.DATE
    },
    reason: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    seen: {
      type: DataTypes.STRING,
    },
    insurance: {
      type: DataTypes.STRING,
    },
    // date: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    // time: {
    //     type: DataTypes.ARRAY(DataTypes.STRING),
    //     defaultValue: []
    // },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Unpublished"
    },
    reviewStatus: {
      type: DataTypes.STRING,
    },
  },
  { underscored: true }
);

module.exports = appointment;
