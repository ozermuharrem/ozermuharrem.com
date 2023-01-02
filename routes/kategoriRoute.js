const express = require('express');
const Kategori = require('../models/Kategori');
const kategoriController = require('../controllers/kategoriController');


const router = express.Router();

router.route('/createKategori').post(kategoriController.createKategori);
router.route('/:_id').delete(kategoriController.deleteKategori);


module.exports = router;
