const mongoose = require('mongoose');
const slugify  = require('slugify');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title : {
        type:String,
        required:true
    },
    kisaAciklama: {
        type: String,
        required:true,
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    images:{
        type:String,
        required:true
    },
    createDate:{
        type:Date,
        default : Date.now
    },
    slug:{
        type:String,
        unique:true
    },
    kategori:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Kategori'
    },
    markPath:{
        type : String,
        required:true
    }
})

blogSchema.pre('validate',function(next){
    this.slug = slugify(this.title,{
        lower:true,
        strict:true
    })
    next();
})

const Blog = mongoose.model('blog',blogSchema);

module.exports = Blog;