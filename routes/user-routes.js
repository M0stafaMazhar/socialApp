const userRouter = require("express").Router();
const userController = require("../app/controlers/user-controllers");
const {auth} = require("../app/middleware")
const {adminAuth} =  require("../app/middleware")
const upload = require("../app/file-upload")










userRouter.post("/register", userController.register)

userRouter.post("/login", userController.login)

userRouter.get("/", auth , userController.show)
//change status
userRouter.post("/activate", auth , userController.activate)

userRouter.post("/diactivate", auth , userController.diActivate)
//edit
userRouter.patch("/editme", auth, userController.editMe)

userRouter.patch("/edituser/:id", adminAuth , userController.editUser)
//delete
userRouter.delete("/deleteme", auth, userController.deleteMe)

userRouter.delete("/delete/:id", adminAuth , userController.deleteUser)
//address
userRouter.post("/address", auth , userController.addAddress)

userRouter.delete("/deketeadress" , auth , userController.deleteAddress)

userRouter.get("/alladresses" , auth , userController.showAllAddresses)

userRouter.get("/showadress/:id", auth , userController.showOneAddress)

userRouter.post("/addimage", auth, upload.single("avatar") , userController.addPhoto)





module.exports = userRouter