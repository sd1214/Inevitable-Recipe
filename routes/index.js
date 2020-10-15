const express=require('express')
const { ensureGuest, ensureauth } = require('../middleware/auth_middleware')
const Recipe=require('../models/recipe')
const router=express.Router()

router.get('/',ensureGuest,(req,res)=>{
    res.render('login',
    {layout:'loginLayout'})
})
router.get('/dashboard',ensureauth,async(req,res)=>{ 
    console.log(req.user);
    try{
        const recipes=await Recipe.find({user:req.user.id}).lean()
        res.render('dashboard',{
            name:req.user.firstName,
            recipes
        })
    }   
    catch(err){
        console.error(err);
    }
    
})        
module.exports=router