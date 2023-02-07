const helper = require('./helper')
const jwt = require("jsonwebtoken");
const model = require('../db/models/user-model')



const auth = async (req, res, next) => {
    try{
        const token = req.header("authorization").replace("Bearer ", "")
        const decoded = jwt.verify(token, "password");
        const userData = await model.findOne({_id: decoded._id, "tokens.token":token})
        req.user = userData
        req.token = token
        next()

    }
    catch(e){
        
        helper.sendMessage(res , 500 , false , e , e.message)
    }
}


const adminAuth = async (req, res, next) => {
    try{
        const token = req.header("authorization").replace("Bearer ", "")
        const decoded = jwt.verify(token, "password");
        const userData = await model.findOne({_id: decoded._id, "tokens.token":token})
        if (userData.userType !== "Admin") throw new Error("you're not allowed to edit this user")
        req.user = userData
        req.token = token
        next()

    }
    catch(e){
        
        helper.sendMessage(res , 500 , false , e , e.message)
    }
}




module.exports = {auth , adminAuth}