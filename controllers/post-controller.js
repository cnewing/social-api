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
            .then(dbPostData => {
        if(!dbPostData) {
          res.sendStatus(404).json({message: "No post with this ID"});
          return;
        }
        res.json(dbPostData)
      })
        
      .catch(err => res.json(err));
  },
  // D E L E T E  P O S T
 deletePost({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post to delete from this ID' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => res.json(err));
  },

// U P D A T E  P O S T
 updatePost({ params, body }, res) {
    Post.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: "No post to update with this ID" });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => res.json(err));
  },


// R E A C T I O N  A C T I O N S

// A D D  A  R E A C T I O N 
 addReaction({params, body}, res) {
    Post.findOneAndUpdate(
      {_id: params.postId}, 
      {$push: {reactions: body}}, 
      {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: "No reaction found with post ID"});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => res.status(400).json(err))
},

