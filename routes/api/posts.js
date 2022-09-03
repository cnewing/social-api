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
