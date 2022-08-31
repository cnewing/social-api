// D E P E N D E N C I E S
const express = require("express");
const mongoose = require("mongoose");

// P O R T
const app = express();
const PORT = process.env.PORT || 5050;

// M I D D L E W A R E
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// M O N G O  C O N N E C T I O N
mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost:27017/social-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set("debug", true);

app.use(require("./routes"));

// I N I T I A L I Z E  S E V E R  L I S T E N E R
app.listen(PORT, () => console.log(`Running on port: ${PORT}`));
