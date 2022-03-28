// same layout

module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define("Player", {
    player_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    player_num: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    goals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    assists: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    blocks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    points_played: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    school_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Player;
};
