const { User } = require("../models");

// U S E R  A C T I O N S

// G E T  A L L  U S E R S
const userController = {
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "posts",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

// G E T  A  U S E R  B Y  I D

// C R E A T E  A  U S E R

// D E L E T E  A  U S E R

// U P D A T E  A  U S E R

// A D D  A  F R I E N D

// D E L E T E  A  F R I E N D

module.exports = userController;