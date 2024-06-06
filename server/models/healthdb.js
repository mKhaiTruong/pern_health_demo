// models/healthdb.js
module.exports = (sequelize, DataTypes) => {
  const HealthDB = sequelize.define("HealthDB", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    host_name: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    response_time: {
      type: DataTypes.FLOAT,
    },
    cpu_usage: {
      type: DataTypes.FLOAT,
    },
    memory_usage: {
      type: DataTypes.FLOAT,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return HealthDB;
};
