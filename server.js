const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000; // if process enviromnet port or 5000 // works when deployed and locally

var db = require("./models");

app.use(express.static(__dirname + "/public")); // look into public folder for front end files

// allows us to parse the data sent to the server
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const handlebars = require("express-handlebars");

// Setting up handlebars
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

const viewRoutes = require("./routes/viewRoutes.js");
//const apiRoutes = require("./routes/apiRoutes.js")

app.use(viewRoutes); // express using routes
// app.use(apiRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); // get the server listening on port
});
