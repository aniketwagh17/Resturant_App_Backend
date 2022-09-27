const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get('/',(req,res) => {
    res.json("Welcome to My Restaurant !!");
});

const PORT = process.env.PORT || 8083;

const db = require("./app/models");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  require("./app/routes/restaurant.routes")(app);

app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
});