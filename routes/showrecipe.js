const express=require('express');
const Recipe = require('../models/recipe');
const { ensureauth } = require('../middleware/auth_middleware');
const router=express.Router()


router.get('/',ensureauth,async(req,res)=>{
    try{
        const recipes=await Recipe.find({status:'public'}).populate('user').sort({createdAt:'desc'}).lean()
        res.render('recipe/show',{
            recipes
        });
    }
    catch(err){
        console.error(err);
    }
}) 
router.get('/:id',ensureauth,async(req,res)=>{
    try{
        const recipe=await Recipe.findById(req.params.id).populate('user').lean()
        res.render('recipe/read',{
            recipe
        });
        console.log(recipe);
    }
    catch(err){
        console.error(err);
    }
})
module.exports=router