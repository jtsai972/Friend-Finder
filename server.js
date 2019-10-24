/* -------------------------------------------------------
 * SET UP: EXPRESS
 * ------------------------------------------------------- */
// * Setting up Express 
const express = require("express");
var app = express();

// * Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Setting up the Express App to serve css & js
app.use(express.static(__dirname + '/app/public/'));

// * Setting Port
var PORT = process.env.PORT || 3000;

// * Routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

/* -------------------------------------------------------
 * STARTING SERVER
 * ------------------------------------------------------- */
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});