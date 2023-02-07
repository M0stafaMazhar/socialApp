const userModel = require('../../db/models/user-model');
const Helper = require('../helper');



class user{


    static register = async (req , res)=>{
        try{
            const userData = new userModel(req.body)
            await userData.save()
            console.log(userData);
            Helper.sendMessage(res , 200 , true , userData , "added successfully")
        }
        catch(e){
            Helper.sendMessage(res , 500 , false , e , e.message)
        }
    }


    static show = async (req , res)=>{
        try{
            const users = await userModel.find()
            
            Helper.sendMessage(res , 200 , true , users , "added successfully")
        }
        catch(e){
            Helper.sendMessage(res , 500 , false , e , e.message)
        }
    }


    static login = async (req, res)=>{
        try{
            const user = await userModel.loginUser(req.body.email, req.body.password)
            const token = await user.generateToken();
            Helper.sendMessage(res , 200 , true , {user , token} , "success")
        }
        catch(e){
            Helper.sendMessage(res , 500 , false , e , e.message)
        }
    }


    static activate = async (req, res)=>{
        try{
            req.user.status = true;
            await req.user.save();
            Helper.sendMessage(res , 200 , true , {user:req.user} , "success")
        }
        catch(e){
            Helper.sendMessage(res , 500 , false , e , e.message)
        }
    }


    static diActivate = async (req, res)=>{
        try{
            req.user.status = false;
            await req.user.save();
            Helper.sendMessage(res , 200 , true , {user:req.user}  , "success")
        }
        catch(e){
            Helper.sendMessage(res , 500 , false , e , e.message)
        }
    }


    static editMe = async (req, res)=>{
        try{
            Object.assign(req.user , req.body)
            await req.user.save();
            Helper.sendMessage(res , 200 , true , {user:req.user}  , "your data has been updated")
        }
        catch(e){
            Helper.sendMessage(res , 500 , false , e , e.message)
        }
    }


    static editUser = async (req , res)=>{
        try{
            const user = await userModel.findById(req.params.id);
            Object.assign(user, req.body)
            await user.save();
            Helper.sendMessage(res , 200 , true , user , "user data has been updated")
        }
        catch(e){
            Helper.sendMessage(res , 500 , false , e , e.message)
        }
    }


    static deleteMe = async(req, res)=>{
        try{
            await req.user.delete()
            Helper.sendMessage(res, 200, true, null , "Your account has been deleted")
        }
        catch(e){
            Helper.sendMessage(res , 500 , false , e , e.message)
        }
    }


    static deleteUser = async (req, res)=>{
        try{
            const user = await userModel.findById(req.params.id);
            await user.remove();
            Helper.sendMessage(res , 200 , true , null , "user acount has been deleted")
        }
        catch(e){
            Helper.sendMessage(res , 500 , false , e , e.message)
        }
    }


    static addAddress = async(req, res)=>{
        try{
            req.user.addresses.push(req.body);
            await req.user.save();
            Helper.sendMessage(res , 200 , true , {user:req.user} , "adress added successfully")
        }
        catch(e){
            Helper.sendMessage(res , 500 , false , e , e.message)
        }
    }


    static deleteAddress = async(req, res)=>{
            try{
                req.user.addresses = req.user.addresses.filter(a => a !== req.body.address)
                await req.user.save()
                Helper.sendMessage(res , 200 , true , {user:req.user} , "adress removed successfully")
            }
            catch(e){
                Helper.sendMessage(res , 500 , false , e , e.message)
            }
    }


    static showAllAddresses = async(req, res)=>{
        try{
            Helper.sendMessage(res , 200 , true , req.user.addresses , "all addresses")
        }
        catch(e){
            Helper.sendMessage(res , 500 , false , e , e.message)
        }
    }

    static showOneAddress = async(req, res)=>{
        try{
            const adress = req.user.adresses.findById(req.params.adressId)
            Helper.sendMessage(res , 200 , true , adress , "your address")
        }
        catch(e){
            Helper.sendMessage(res , 500 , false , e , e.message)
        }
    }

    static addPhoto = async(req, res)=>{
        try{
            req.user.image = req.file.filename
            await req.user.save();

            Helper.sendMessage(res , 200 , true , req.user , "profile updatated")
            
        }
        catch(e){
            Helper.sendMessage(res , 500 , false , e , e.message)
        } 
       }


}


module.exports = user