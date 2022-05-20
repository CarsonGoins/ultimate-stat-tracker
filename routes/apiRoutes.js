// always same format, deals with db

const express = require("express");
const router = express.Router();

const db = require("../models");

router.post("/teams", (request, response) => {
  db.Team.create(request.body).then(() => {
    response.send({ redirectTo: "/" });
  });
});

router.post("/players", (request, response) => {
  db.Player.create(request.body).then(() => {
    response.send({ redirectTo: "/" });
  });
});

router.put("/players", (request, response) => {
  console.log(request.body);
  db.Player.update(
    {
    assists: request.body.assists,
    goals: request.body.goals,
    blocks: request.body.blocks,
    points_played: request.body.points_played
  },
  // update the row WHERE the player number and school ID match what was (REQUESTED) (the player in which the edit button was hit)
  {
    where: {
    player_name: request.body.player_name,
    school_id: request.body.school_id,
    player_num: request.body.player_num
  }}
  ).then(() => {
    console.log("response.req.body", response.req.body)
    response.send({ message: "success"});
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

// router.put("/teams", (request, response) => {
//   console.log(request.body);
//   db.Team.update(
//     {
//     school_name: " ",
//     school_Id: " ",
//     school_pass: " ",
//     school_Id: " ",
//   },
//   // update the row WHERE the player number and school ID match what was (REQUESTED) (the player in which the edit button was hit)
//   {
//     where: {
//     school_Id: request.body.id,
//   }}
//   ).then(() => {
//     console.log("response.req.body", response.req.body)
//     response.send({ message: "success"});
//   });
// });


// router.delete("/teams/:id", (request, response) => {
// response.send(request.body.school);
// });

module.exports = router;