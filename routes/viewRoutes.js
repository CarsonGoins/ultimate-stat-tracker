// always same format, deals with front end

const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/", (request, response) => {
  db.Team.findAll({}).then((dbTeam) => {
    const handlebarsObject = {
      team: dbTeam.map((data) => {
        return {
          team_name: data.team_name,
          school_name: data.school_name,
          school_abv: data.school_abv,
          id: data.id,
        };
      }),
    };
    return response.render("index", handlebarsObject);
  });
});

router.get("/add-team", (request, response) => {
  return response.render("addTeam");
});

router.get("/roster", (request, response) => {
  console.log("request.query.id", request.query.id);
  db.Player.findAll({ where: { school_id: parseInt(request.query.id) } }).then(
    (dbPlayer) => {
      // if authenticated send all stats
      const handlebarsObject = {
        // authenticated:
        player: dbPlayer.map((data) => {
          return {
            player_name: data.player_name,
            player_num: data.player_num,
          };
        }),
      };
      return response.render("roster", handlebarsObject);
    }
  );
});
module.exports = router;
