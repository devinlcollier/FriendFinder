const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = require("./app/routing/apiRoutes.js")(app);
const htmlRoutes = require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function(){
	console.log("server started on port " + PORT);
});