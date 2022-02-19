module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define("Player", {
    player_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    player_num: {
      type: DataTypes.INT,
      allowNull: true,
    },
    goals: {
      type: DataTypes.INT,
      allowNull: false,
      defaultValue: 0,
    },
    assists: {
      type: DataTypes.INT,
      allowNull: false,
      defaultValue: 0,
    },
    blocks: {
      type: DataTypes.INT,
      allowNull: false,
      defaultValue: 0,
    },
    points_played: {
      type: DataTypes.INT,
      allowNull: false,
      defaultValue: 0,
    },
  });
  return Player;
};
