const { Schema, model } = require("mongoose");

// U S E R  S C H E M A
const userSchema = new Schema({
    const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+@+\..+/]
  },
  posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
});
// F R I E N D  C O U N T
