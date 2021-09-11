const express = require('express');
const router = express.Router();
const Post = require('../model/post');
const jwt =require('jsonwebtoken');

const validateUser = require('../validation/validation');

// Login
router.post("/login", (req, res, next)=>{
    var username = req.body.email;
    var password = req.body.password;
    Post.findOne({$or: [{email:username}, {name:username}]})
    .then(user => {
        if(user){
                if(password == user.password){
                    let token = jwt.sign({name:user.name}, 'mySecretKey', { expiresIn:'2h'})
                    res.json({
                        message: 'Login Successful!',
                        token
                    })
                }
                else {
                    
                    res.json({
                        message:'Incorrect Password'
                    })
                }
           
        } else{
            res.json({
                message:"User doesn't exist !"
            })
        }
    })
})

//Create user
router.post('/',async (req, res)=>{
    const posting = new Post({
        name:req.body.name,
        surname: req.body.surname,
        email:req.body.email,
        password:req.body.password
    });

    const user ={
        name:req.body.name,
        surname: req.body.surname,
        email:req.body.email,
        password:req.body.password
    }
    response = validateUser(user)

    if(response.error){  
        res.json(response.error.details);
    }
    else{
        console.log("Validated Data");
        try{
            const savedPost =await posting.save();
            res.json(savedPost);
        }
        catch (err){
            res.json({message:err});
        }
    }
  
});


//List of users
router.get('/', async (req,res)=>{
    try{
        const posts = await Post.find();
        res.json(posts);

    }
    catch(err){
        res.json({message:err});
    }
});

//Update User Profile
router.patch("/:userId", async (req, res) =>{
    const user ={
        name:req.body.name,
        surname: req.body.surname,
        email:req.body.email,
        password:req.body.password
    }
     response = validateUser(user)

    if(response.error){  

        res.json(response.error.details);
    }
    else{
        console.log("Validated Data");
            try{
                const updatePost= await Post.updateOne({_id:req.params.userId}, {$set:{name:req.body.name,surname:req.body.surname,email:req.body.email,password:req.body.password}}
            );
                    res.json(updatePost);
            }
            catch(err){
                     res.json({message:err});
             }
    }
});


//Get specific user
router.get("/:userId",async  (req,res)=>{
    try{
        const post = await Post.findById(req.params.userId);
        res.json(post);
    }
    catch(err){
        res.json({message:err});
    }
});



//delete user
router.delete("/:userId", async (req, res)=>{
    try{
        const removedPost= await Post.deleteOne({_id:req.params.userId});
         res.json(removedPost);
    }
    catch(err){
        res.json({message:err});
    }
});


//protecting routes



module.exports = router;