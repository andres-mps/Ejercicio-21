const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes/routes.js");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(routes);

app.listen(port, () => console.log(`http://localhost:${port}`));
