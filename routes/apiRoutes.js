// always same format, deals with db

const express = require("express");
const router = express.Router();

const db = require("../models");

router.post("/teams", (request, response) => {
  db.Team.create(request.body).then(() => {
    response.send({ redirectTo: "/" });
  });
});

router.post("/team-password", (request, response) => {
  console.log(request.body.id);
  db.Team.findOne({ where: { id: parseInt(request.body.id) } }).then(
    (dbTeam) => {
      if (dbTeam.password === request.body.password) {
        db.Player.findAll({
          where: { school_id: parseInt(request.body.id) },
        }).then((dbPlayer) => {
          // if authenticated send all stats
          const playerObject = {
            // authenticated:
            player: dbPlayer.map((data) => {
              return {
                player_name: data.player_name,
                player_num: data.player_num,
                player_blocks: data.blocks,
                player_assists: data.assists,
                player_goals: data.goals,
                points_played: data.points_played,
              };
            }),
          };
          return response.send(playerObject);
        });
      } else {
        return response.send({ message: "Incorrect password" });
      }
      // response.send({ redirectTo: "/" });
    }
  );
});

router.get("/players", (request, response) => {
  db.Player.findAll({}).then((dbPlayer) => {
    const handlebarsObject = {
      player: dbPlayer,
    };
    return response.render("players", handlebarsObject);
  });
});
module.exports = router;
