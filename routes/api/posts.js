const router = require("express").Router();

// I M P O R T  F R O M  C O N T R O L L E R
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addReaction,
  deleteReaction,
} = require("../../controllers/post-controller");
router.route("/").get(getAllPosts).post(createPost);

router.route("/:id").get(getPostById).put(updatePost).delete(deletePost);

router.route("/:postId/reactions").post(addReaction);

router.route("/:postId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
