module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define("Team", {
    team_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    school_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    school_abv: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Team;
};
