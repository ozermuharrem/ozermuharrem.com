const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ozellestirSchema = new Schema({
    profilImage : {
        type: String,
        required:true
    },
    profilName : {
        type: String,
        required:true
    },
    profilTitle : {
        type: String,
    },
    telefonNo : {
        type : String,
        required : true
    },
    emailAdres : {
        type:String,
        required : true,
        trim:true,
        lower:true
    },
    githubLink : {
        type: String,
        required:true,
        trim:true,
    },
    instegramLink : 
    {
        type: String,
        required:true,
        trim:true,
    },
    linkedinLink : {
        type: String,
        required:true,
        trim:true,
    }
})

const Ozellestir = mongoose.model('ozellestir',ozellestirSchema);

module.exports = Ozellestir;