const postModel = require('../../db/models/pst-model');
const Helper = require('../helper');

class post{
    static addPost = async (req, res)=>{
        try {
            
            const post = new postModel({...req.body , userId: req.user._id})
            await post.save();
            Helper.sendMessage(res , 200 , true , post , "Post added successfully")
            
        }
        catch (e) {
            Helper.sendMessage(res , 500 , false , e , e.message)
        }
    }

    static showPosts = async (req, res)=>{
        try {
            await req.user.populate("myPosts")
            Helper.sendMessage(res , 200 , true , req.user.myPosts , "your posts")
            
        }
        catch (e) {
            Helper.sendMessage(res , 500 , false , e , e.message)
        }
    }

    static showSingle = async (req, res)=>{
        try {
            const post = await postModel.findOne({_id : req.params.id})
            Helper.sendMessage(res , 200 , true , post , "your post")

        }
        catch (e) {
            Helper.sendMessage(res , 500 , false , e , e.message)
        }
    }

    static showAllPosts = async (req, res)=>{
        try{
            let posts = await postModel.find()
            posts = posts.map(post => post.userId.toString() == req.user._id.toString() ? 
            post = {...post._doc , isMine: true} :
            post = {...post._doc, isMine: false} )
            Helper.sendMessage(res, 200, true, posts, "all posts")
        }
        catch(e){
            Helper.sendMessage(res, 500, false, e, e.message)
        }
    }

    static deletePost = async (req, res)=>{
        try {
            const post = await postModel.findOneAndDelete({userId: req.user._id, _id : req.params.id})
            if(!post) throw new Error("post not found")
            Helper.sendMessage(res , 200 , true , null , "your post was successfully deleted")
        }
        catch (e) {
            Helper.sendMessage(res , 500 , false , e , e.message)
        }
    }

    static deleteAllPosts = async (req, res)=>{
        try {
            await postModel.deleteMany({userId: req.user._id})
            Helper.sendMessage(res, 200, true, null, "all posts was successfully deleted")

        }
        catch (e) {
            Helper.sendMessage(res, 500, false, e, e.message)
        }
    }

    static editPost = async (req, res)=>{
        try {
            const post = await postModel.findOne({userId: req.user._id, _id : req.params.id})
            if(!post) throw new Error("post not found")
            Object.assign(post , req.body)
            await post.save()
            Helper.sendMessage(res , 200 , true , post , "post updated successfully")

        }
        catch (e) {
            Helper.sendMessage(res , 500 , false , e , e.message)
        }
    }


}

module.exports = post