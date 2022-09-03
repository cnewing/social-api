const { Post, User } = require("../models");

// P O S T  A C T I O N S
const postController = {
  // G E T  A L L  P O S T S
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
  // C R E A T E  A  P O S T
  createPost({ body }, res) {
    Thought.create(body)
      .then (({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId},
          {$push: { posts: _id }},
          { new: true }
        );
      })