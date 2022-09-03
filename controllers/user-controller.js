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
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "posts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "This ID does not match any user" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // C R E A T E  A  U S E R
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
  // D E L E T E  A  U S E R
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "no user found" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // U P D A T E  A  U S E R
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  // A D D  A  F R I E N D
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendsId } },
      { new: true }
    )
      .then((dbUserData) => {
          if (!dbUserData) {
          res.status(404).json({ message: "No user found" });
          return;
        }
        res.json(dbUserData));
      }),
      .catch((err) => res.status(400).json(err));
  },
  // D E L E T E  A  F R I E N D
 deleteFriend ({ params }, res) => {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendsId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'Cannot delete friend! ID does not match!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
    });

module.exports = userController;
