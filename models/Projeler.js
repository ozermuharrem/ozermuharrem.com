const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projeSchema = new Schema({
    projeTitle : {
        type : String,
        required:true
    },
    projeDescription : {
        type:String,
        required: true
    },
    projeLink : {
        type:String,
        required:true
    },
    projeGithub : {
        type:String,
        unique : true
    },
    createData : {
        type: Date,
        default : Date.now
    }
})

const Projeler = mongoose.model('projeler',projeSchema);

module.exports = Projeler;