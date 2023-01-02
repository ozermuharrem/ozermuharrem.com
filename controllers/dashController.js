const fs = require('fs');
const Kategori = require("../models/Kategori");
const Blog = require("../models/Blog");
const Ozellestir = require("../models/Ozellestir");
const Projeler = require("../models/Projeler");

exports.getBlogDashPage = async (req,res) => {
    try {
        const kategori = await Kategori.find();
        const blogs = await Blog.find();
        const projeler = await Projeler.find();


        res.status(200).render('blogDashboard',{
            kategori,
            blogs,
            projeler
        });
        
    } catch (error) {
        res.status(400).json({
            status : "hata",
            error
        })
    }
}

exports.getOzellestirDashPage = async (req,res) => {
    try {
        const ozellestir = await Ozellestir.find();

        res.status(200).render('ozellestirDashboard ',{
            ozellestir,
        });
    } catch (error) {
        res.status(404).redirect('404',{
            error
        });
    }
}

exports.createOzellestir = async (req,res) => {
    try {
        const uploadDir = 'public/siteImage';
        
        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }
        
        let uploadImage = req.files.profilImage;
        let uploadPath = __dirname+'/../public/siteImage/' + uploadImage.name;
    
        uploadImage.mv(uploadPath,async()=>{
            await Ozellestir.create({
                ...req.body,
                profilImage : '/siteImage/'+uploadImage.name
            })
            res.status(201).redirect('/blog')
        })
    } catch (error) {
        res.status(400).json({
            status : 'fail',
            error,
        })
    }
}

exports.deleteOzellestir = async (req,res) => {
    try {
        console.log(req.params._id);
        await Ozellestir.findByIdAndRemove(req.params._id);
        res.status(200).redirect('/dash/ozellestirDashboard')
    } catch (error) {
        res.status(400).json({
            status : 'ozelleştir silinemedi',
            error
        });
    }
}

exports.updateOzellestir = async (req,res) => { 
    try {
        const arguman = await Ozellestir.findById(req.params._id);
        console.log( __dirname + '/../public' + arguman.profilImage)
        if(req.files){
            console.log("buraya girdi if\n")
            let deletePhoto = __dirname + '/../public' + arguman.profilImage;
            console.log('delete photo path'+deletePhoto);
            fs.unlinkSync(deletePhoto);
            await Ozellestir.findByIdAndRemove(req.params._id);


            let uploadImage = req.files.profilImage;
            let uploadPath = __dirname+'/../public/siteImage/' + uploadImage.name;
            uploadImage.mv(uploadPath,async()=>{
                await Ozellestir.create({
                    profilName : req.body.profilName,
                    profilTitle : req.body.profilTitle,
                    telefonNo : req.body.telefonNo,
                    emailAdres : req.body.emailAdres,
                    githubLink : req.body.githubLink,
                    instegramLink : req.body.instegramLink,
                    linkedinLink : req.body.linkedinLink,
                    profilImage : '/siteImage/'+uploadImage.name
                })})
        }else{
            console.log("buraya girdi else")
            arguman.profilName = req.body.profilName;
            arguman.profilTitle = req.body.profilTitle;
            arguman.telefonNo = req.body.telefonNo;
            arguman.emailAdres = req.body.emailAdres;
            arguman.githubLink = req.body.githubLink;
            arguman.instegramLink = req.body.instegramLink;
            arguman.linkedinLink = req.body.linkedinLink;

            arguman.save();
        }

        res.status(200).redirect('/dash/ozellestirDashboard')
    } catch (error) {
        res.status(400).json({
            status : 'verilen güncellenemedi',
            error
        })
        console.log(error);
        
    }
}

exports.getProjelerimDashPage = async (req,res) => {
    try {
        const projeler = await Projeler.find();
    
        res.status(200).render('projelerimDashboard',{
            projeler,

        });
    } catch (error) {
        res.status(404).redirect('404',{
            error
        });
    }
}

exports.createProje = async (req,res) => {
    try {
         await Projeler.create(req.body);

        res.status(201).redirect('/dash/projelerimDashboard')
    } catch (error) {
        res.status(404).redirect('404');
    }
}

exports.deleteProje = async (req,res) => {
    try {
        console.log('projelerimden gelen id '+req.params._id);
        await Projeler.findByIdAndRemove(req.params._id);
        res.status(200).redirect('/dash/projelerimDashboard')
    } catch (error) {
        res.status(400).json({
            status : 'proje silinemedi',
            error
        });
    }
}

exports.updateProje = async (req,res) => {
    try {
        const upProje = await Projeler.findById(req.params._id);

        
        upProje.projeTitle = req.body.projeTitle;
        upProje.projeLink = req.body.projeLink;
        upProje.projeDescription = req.body.projeDescription;

        upProje.save();
        res.status(200).redirect('/dash/projelerimDashboard')
    } catch (error) {
        res.status(400).json({
            status : 'proje güncellenemedi',
            error
        });
    }
}