const Kategori = require('../models/Kategori');

exports.createKategori = async (req,res) => {
    try {
        await Kategori.create(req.body);
        res.status(201).redirect('/dash/blogDashboard')
    } catch (error) {
        res.status(400).json({
            status : 'kategori oluşturulamadı',
            error
        })
    }
}

exports.deleteKategori = async (req,res) => {
    try {
        await Kategori.findByIdAndDelete(req.params._id);
        res.status(200).redirect('/dash/blogDashboard')
    } catch (error) {
        res.status(400).json({
            status : 'kategori Silinemedi',
            error
        })
    }
}