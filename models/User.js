const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    googleId:{
        type:String,
        required:true
    },
    displayName:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    image:{
        type:String
    }
})
module.exports=mongoose.model('User',UserSchema)