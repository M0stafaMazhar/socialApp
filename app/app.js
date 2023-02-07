require("../db/connect");

const express = require('express');
const app = express();
const userRoutes = require('../routes/user-routes');
const postRoutes = require('../routes/post-routes');



app.use(express.json());
app.use("/api/user/",  userRoutes)
app.use("/api/post/", postRoutes)




const multer = require("multer");
const upload = multer({ dest: "uploads/" })
const fs = require("fs");
const path = require("path");


app.post('/profile' , upload.single('avatar') , (req , res)=>{
    const ext = req.file.originalname.split(".").pop()
    const newName = "uploads/"+Date.now()+"test."+ext
    fs.renameSync(req.file.path, newName)
    res.send({file:req.file ,newName })
})



// app.post("/addphoto" , auth , upload.single('avatar') , 




app.all("*"  , (req , res) => {
    res.status(404).send({
        apisStatus:false,
        message:"Invalid URL",
        data: {}
    })
})


module.exports = app;