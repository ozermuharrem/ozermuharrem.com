const Blog = require('../models/Blog');
const fs = require('fs');
const Ozellestir = require('../models/Ozellestir');
const Kategori = require('../models/Kategori');
const md = require('markdown-it')();

exports.createBlog = async(req,res) => {
    try {
        const uploadDir = 'public/uploads';
        
        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }
        
        let uploadImage = req.files.images;
       
        let uploadPath = __dirname+'/../public/uploads/' + uploadImage.name;
        
      
        //! burdan yukarısı bd ye kaydetme 

        const uploadMdDir = 'public/markdown';

        if(!fs.existsSync(uploadMdDir)){
            fs.mkdirSync(uploadMdDir);
        }

    let fileName = req.body.title.trim().toLowerCase().split(' ');

    let yol;
    for(let i = 0; i < fileName.length; i++)
    {
        if(i == 0)
            yol = fileName[i]+'-';
        else if(i == fileName.length-1)
            yol += fileName[i];
        else
            yol += fileName[i]+'-';
    }
    
        fs.writeFile(`${__dirname}/../views/partials/markdown/${yol}.ejs`,md.render(req.body.description), (err) => {
            if(err) console.log(err);
        })

        uploadImage.mv(uploadPath,async()=>{
            await Blog.create({
                ...req.body,
                images : '/uploads/'+uploadImage.name,
                markPath : `partials/markdown/${yol}`
            })



            req.flash("success","Blog Başarılı Bir Şekilde Oluşturuldu.");
            res.status(201).redirect('/blog')
        })
    } catch (error) {
        req.flash("err","createBlog Oluşturulamadı");
        res.status(400).redirect('/dash/blogDashboard');
    }
}


exports.getBlog = async (req,res) => {
    try {
        const tekblog = await Blog.findOne({slug:req.params.slug});
        const ozellestir = await Ozellestir.find(); 

        console.log(tekblog.createDate);

        let date = `${tekblog.createDate.getDay()}/${tekblog.createDate.getMonth()}/${tekblog.createDate.getFullYear()}`;
        console.log(date);

        res.status(200).render('makale',{
            tekblog,
            page_name : 'blog',
            ozellestir,
            date
        })

    } catch (error) {
        res.status(400).json({
            status:"getBlog oluşturulamadı",
            error
        })
    }
}

exports.deleteBlog = async (req,res) => {
    try {
        const photo = await Blog.findOne({slug:req.params.slug});
        let deletePhoto ='public' + photo.images;
        let deleteMark ='views/'+photo.markPath+'.ejs';
     
        fs.unlinkSync(deletePhoto);
        fs.unlinkSync(deleteMark);
        await Blog.findOneAndRemove({slug: req.params.slug});
        res.status(200).redirect('/dash/blogDashboard')
    } catch (error) {
        res.status(400).json({
            status : 'blog silinemedi',
            error
        });
        console.log(error);  
    }
}

exports.updateBlog = async (req,res) => {
    try {
      const blog =  await Blog.findOne({slug: req.params.slug});

        if(req.files){
            let deletePhoto = __dirname + '/../public' + blog.images;
            console.log(deletePhoto);
            fs.unlinkSync(deletePhoto);
            await Blog.findOneAndRemove({slug: req.params.slug});


            let uploadImage = req.files.images;
            let uploadPath = __dirname+'/../public/uploads/' + uploadImage.name;
            uploadImage.mv(uploadPath,async()=>{
                await Blog.create({
                    title : req.body.title,
                    author : req.body.author,
                    description : req.body.description,
                    kategori : req.body.kategori,
                    kisaAciklama : req.body.kisaAciklama,
                    images : '/uploads/'+uploadImage.name
                })})
        }else{
            
            blog.title = req.body.title;
            blog.author = req.body.author;
            blog.description = req.body.description;
            blog.kategori = req.body.kategori;
            blog.kisaAciklama = req.body.kisaAciklama;
            blog.save();
        }


        res.status(200).redirect('/dash/blogDashboard')
    } catch (error) {
        res.status(400).json({
            status : 'blog güncellenemedi',
            error
        });     
    }
}

exports.filterBlog = async(req,res) => {
    try {
      

        res.status(200).redirect('/blog')
    } catch (error) {
        res.status(400).json({
            status: 'searc err',
            error
        })
    }
}