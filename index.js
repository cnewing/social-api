// D E P E N D E N C I E S
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// I N I T I A L I Z E  S E V E R  L I S T E N E R
app.listen(5050, () => {
  console.log("Sever running!");
});
// com
