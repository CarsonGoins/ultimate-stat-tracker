const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/", (request, response) => {
  return response.render("index");
});

router.get("/teams", (request, response) => {
  return response.render("teams");
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
