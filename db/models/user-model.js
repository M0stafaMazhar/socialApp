const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    fName:{
        type: String,
        required: true,
        trim: true,
        lowerCase: true,
        minlength: 5,
        maxlength: 20

    }, lName:{
        type: String,
        trim: true,
        lowerCase: true,
        required: true,
        minlength: 5,
        maxlength: 20

    }, age:{
        type: Number,
        required: true,
        trim: true,
        min: 15,
        max: 64

    }, email:{
        type: String,
        trim: true,
        required: true,
        //minlength: ,
        //maxlength:,
        unique: true,
        lowerCase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email")
            }
        }

    }, status:{
        type: Boolean,
        default: true

    }, addresses: [{
        adressType:{
            type: String,
            trim: true,
            required: true,
        },
        details:{}
    }]

    , image:{
        type: String,
        trim: true

    }, password:{
        type: String,
        trim: true,
        required: true,
        encrypted : true,
        minlength: 8,
        //validate:

    }, gender:{
        type: String,
        enum : ["male" , "female"]

    }, 
    dOfBirth:{
        type: Date,
        
    }, phoneNum:{
        type: String,
        trim: true,
        validate(value){
            if(!validator.isMobilePhone(value , "ar-EG")){
                throw new Error("invalid phone")
        }
    }
},
    tokens:[{
        token:{
            type: String,
            required: true,
    }}],

    userType:{
        type: String,
        enum: ["User", "Admin"]
    }
}, 
{timestamps: true});


userSchema.pre('save', async function(){
    if(this.isModified("password")){
        this.password = await bcryptjs.hash(this.password, 5)
    }
})

userSchema.virtual("myPosts" , {
    ref : "Post",
    localField : "_id",
    foreignField : "userId",
    match:{isMine: true}
})

userSchema.statics.loginUser = async(email, password)=>{
    const userData = await User.findOne({email});
    if(!userData) throw new Error("user not found");
    const validatePassword = await bcryptjs.compare(password , userData.password);
    if(!validatePassword) throw new Error("invalid password");
    return userData;
}


userSchema.methods.generateToken = async function(){
    const userData = this;
    const token = jwt.sign({_id: this._id} , "password");
    userData.tokens = userData.tokens.concat({token})
    await userData.save();
    return token;
}


userSchema.methods.toJSON = function(){
    const data = this.toObject();
    delete data.password;
    delete data.__v;
    delete data.tokens;
    return data;
}

const User = mongoose.model('user', userSchema);



module.exports = User