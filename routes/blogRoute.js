const express = require('express');
const Blog = require('../models/Blog');

const blogController = require('../controllers/blogController');

const router = express.Router();

router.route('/createBlog').post(blogController.createBlog);
router.route('/:slug').get(blogController.getBlog);
router.route('/:slug').delete(blogController.deleteBlog);
router.route('/:slug').put(blogController.updateBlog);
// router.route('/filters').get(blogController.filterBlog);


module.exports = router;