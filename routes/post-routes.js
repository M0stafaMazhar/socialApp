const postRouter = require("express").Router();
const postController = require("../app/controlers/post-controlers");
const {auth} = require("../app/middleware")
const {adminAuth} =  require("../app/middleware")
const upload = require("../app/file-upload")



postRouter.post("/add" , auth , upload.single("avatar")  , postController.addPost)

postRouter.get("/myposts", auth , postController.showPosts)

postRouter.delete("/post/:id", auth , postController.deletePost)

postRouter.patch("/edit/:id", auth , postController.editPost)

postRouter.get("/allposts", auth , postController.showAllPosts)

postRouter.delete("/deleteall" , adminAuth , postController.deleteAllPosts)


module.exports = postRouter