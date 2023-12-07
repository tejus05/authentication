import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9q1tHxDvv6QJqPmlvUze-Q48FM8WtCXZJEWg-KTyeVdYhhsSGE0z_cLnzw2z2IDBO9u0&usqp=CAU"
  }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;