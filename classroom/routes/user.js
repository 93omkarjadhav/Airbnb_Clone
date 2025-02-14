const express = require("express");
const router = express.Router();
//const users= require("./routes/user.js");

router.get("/", (req,res)=>{
    res.send("hii i am root");
});

//router.use("/users", users);




//index -users
router.get("/", (req,res)=>{
    res.send("GET for users");
})

//show -users
router.get("/:id", (req,res)=>{
    res.send("GET for show user id");
})

//post -users
router.post("/", (req,res)=>{
    res.send("POST for users");
})

//delete -users
router.delete("/:id", (req,res)=>{
    res.send("delete for user id");
})

module.exports= router;

