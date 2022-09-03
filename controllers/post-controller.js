const { Post, User } = require("../models");

const postController = {

  getAllPosts(req, res) {
    Post.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // G E T  A  P O S T  B Y  I D
  