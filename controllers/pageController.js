const { fileLoader } = require("ejs");
const { query } = require("express");
const nodemailer = require("nodemailer");
const Blog = require('../models/Blog');
const Kategori = require('../models/Kategori');
const Ozellestir = require('../models/Ozellestir');
const Projeler = require('../models/Projeler');


exports.getIndexPage = async (req,res) => {
    try {
        console.log(req.session.userID);
        const ozellestir = await Ozellestir.find();
        res.status(200).render('index',{
            page_name : 'index',
            ozellestir
        }) 
    } catch (error) {
        res.status(404).json({
            status: 'basarısız',
            error
        });
    }

}

exports.getAboutPage = async (req, res) => {
    const ozellestir = await Ozellestir.find();
    res.status(200).render('hakkimda',{
        page_name : 'hakkimda',
        ozellestir
    })
}
exports.getProjelerPage = async (req, res) => {
    const ozellestir = await Ozellestir.find();
    const projeler = await Projeler.find();

    res.status(200).render('projeler',{
        page_name : 'projeler',
        ozellestir,
        projeler
    })
}

exports.getBlogPage = async (req, res) => {
    try {

        const page = req.query.page || 1;

        const blogPerPage = 5;

        const totalBlog = await Blog.find().countDocuments();
        const kategoriSlug = req.query.kategori;   
        const kategori = await Kategori.findOne({slug: kategoriSlug });
        let filter = {};

        if(kategoriSlug){
            filter = {filKategori:kategori._id}
        }

        const blog = await Blog.find(filter)
        .sort('-createDate')
        .skip((page - 1 ) * blogPerPage)
        .limit(blogPerPage);
          
        const ozellestir = await Ozellestir.find();
        const kategoris = await Kategori.find();
        res.status(200).render('blog',{
            blog,
            kategoris,
            page_name : 'blog',
            ozellestir,
            current : page,
            toplamPageCount : Math.ceil(totalBlog / blogPerPage)
        })
    } catch (error) {
        res.status(400).json({
            status:"basarısız",
            error
        })
    }

}
exports.getContactPage =async (req, res) => {
    const ozellestir = await Ozellestir.find();

    res.status(200).render('iletisim',{
        page_name : 'iletisim',
        ozellestir
    })
}

exports.getLogInPage = (req, res) => {
    res.status(200).render('login');
}

exports.getDashboardPage = async (req, res) => {

    const blogs = await Blog.find();
    res.status(200).render('dashboard',{
        page_name : 'dashboard',
        blogs
    })
}

exports.sendEmail = async (req,res) => {

    try {
    const outputmsg = `
    <h1> Mail Detayı </h1>

    <ul>
        <li>Ad : ${req.body.ad}</li>
        <li>Soyad : ${req.body.soyad}  </li>
        <li>E-Mail : ${req.body.email}  </li>
        <li>Telefon No : ${req.body.telNo}  </li>
        <li>Konu : ${req.body.konu}  </li>
    </ul>

    <h1> Mesaj Detayı </h1>
    <p>${req.body.mesaj}</p>
   `

   let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "muharremozer505@gmail.com", // gmail hesabı
      pass: "ucyzajrgzdtidbpb", // gmail şifresi
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"ozermuharrem.com İletişim Sayfasından Geliyor " <muharremozer505@gmail.com>', // sender address
    to: "muharrem.o@outlook.com, muharremozer505@gmail.com", // list of receivers
    subject: "ozermuharrem.com İletisim Sayfası ✔", // Subject line
    html: outputmsg, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

req.flash("success","Mesajınız Başarılı Bir Şekilde İletilmişrir.");
  res.status(200).redirect('/iletisim');
    } catch (error) {
        req.flash("err", `Mesaj Gönderirken Bir Hata Oluştu Lütfen Tekrar Deneyiniz`);
        res.status(400).redirect('/iletisim');

    }
   
}

exports.get404Page = (req,res) => {
    res.render('404');
}
exports.get401Page = (req,res) => {
    res.render('401');
}
exports.get500Page = (req,res) => {
    res.render('500');
}
