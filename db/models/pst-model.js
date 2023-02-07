const mongoose = require("mongoose");
const Post = mongoose.model("Post", {
  //  add, getall, get single, delete, edit , get muy posts

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    trim:true,
    ref:"user"
  },

  postType: {
    type: String,
    enum:["txt" , "file"],
    required: true,
    trim: true,
    lowercase: true
  },

  content:{
    type: String,
    trim: true,
    default: "",
    required: function() {
    return this.postType=="txt" 
    }
  },

  file:{
    type: String,
    trim: true,
    
    required: function() {
      return this.postType=="file"
    }
  }


});




module.exports = Post;