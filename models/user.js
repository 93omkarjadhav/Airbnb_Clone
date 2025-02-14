// const { required } = require("joi");
// const mongoose= require("mongoose");
// const Schema= mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");

// const userSchema= new Schema({
//     email:{
//         type:String,
//         required:true
//     },

// });

// userSchema.plugin(passportLocalMongoose);
// module.exports= mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

// Plugin for authentication
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);  // ✅ Correct export
