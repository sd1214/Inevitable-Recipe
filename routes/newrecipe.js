const express=require('express')
const { ensureGuest, ensureauth } = require('../middleware/auth_middleware')
const Recipe=require('../models/recipe')
const router=express.Router()

router.get('/add',ensureauth,async(req,res)=>{ 
    try{
        res.render('recipe/add')
    }   
    catch(err){
        console.error(err);
    }
})   
router.post('/',ensureauth,async(req,res)=>{
    try{
        req.body.user=req.user.id;
        await Recipe.create(req.body)
        res.redirect('/dashboard');
    }
    catch(err){
        console.error(err);
    }
})     
module.exports=router