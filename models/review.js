// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const reviewSchema= new Schema({
//     comment:String,
//     rating:{
//         type:Number,
//         min:1,
//         max:5
//     },
//     createdAt:{
//         type:Date,
//         default:Date.now
//     },
//     author: {
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User"
//     },
// });

// module.exports=mongoose.model("Review", reviewSchema);

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const reviewschema = new schema({
    comment: {
        type: String,
        required: true, // Make it required
        trim: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: schema.Types.ObjectId,
        ref: "User"
    },
});

module.exports = mongoose.model("Review", reviewschema);
