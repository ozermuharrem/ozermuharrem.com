const bcrypt = require('bcrypt');
const User = require('../models/User');
// const {  validationResult } = require('express-validator');


exports.createUser = async (req,res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            status : 'kullanıcı oluşturuldu',
            user,
        });
    } catch (error) {
        res.status(400).json({
            status : 'kullanici olusturulamadi',
            error,
        });   
    }
}

exports.loginUser = (req, res) => {
    try{
        const {email , password} = req.body;
        User.findOne({email}, (err , user) => {
            if(user) {
                bcrypt.compare(password, user.password , (err , same) => {
                    if(same){
                        // user session
                        req.session.userID = user._id;
                        res.status(200).redirect('/dashboard')
                    }else {
                        req.flash('err', 'Hatalı Şifre')
                        res.status(400).redirect('/login')
                    }
                })
            }
            else {
                req.flash('err', 'Kullanıcı alanı boş olamaz veya kullanıcı yok')
                res.status(400).redirect('/login')
            }
        })
    } catch (error) {
        // const errors = validationResult(req);
        // console.log(errors);
    };
};


exports.logOutUser = (req,res) => {
    req.session.destroy(()=>{
        res.redirect('/');
    })
}

