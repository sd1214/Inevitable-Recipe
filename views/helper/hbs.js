module.exports={
    stripTags:(input)=>{
        return input.replace(/(<([^>]+)>)/gi, "");
    }
}