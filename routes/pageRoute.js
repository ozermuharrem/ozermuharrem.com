const express = require('express');
const pageController = require('../controllers/pageController');
const router = express.Router();
const authMiddlewares = require('../middlewares/authMiddlewares');
const redirectMiddlewares = require('../middlewares/redirectMiddlewares');

router.route('/').get(pageController.getIndexPage);
router.route('/hakkimda').get(pageController.getAboutPage);
router.route('/blog').get(pageController.getBlogPage);
router.route('/projeler').get(pageController.getProjelerPage);
router.route('/iletisim').get(pageController.getContactPage);
router.route('/login').get(redirectMiddlewares,pageController.getLogInPage);
router.route('/dashboard').get(authMiddlewares, pageController.getDashboardPage);
router.route('/iletisim').post(pageController.sendEmail);
router.route('/404').get(pageController.get404Page);
router.route('/401').get(pageController.get401Page);
router.route('/500').get(pageController.get500Page);






module.exports = router;