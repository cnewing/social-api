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
        res.sendStatus(400);
      });
  },
  // G E T  A  P O S T  B Y  I D
  getPostById({ params }, res) {
    Post.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbPostData => res.json(dbPostData)
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },