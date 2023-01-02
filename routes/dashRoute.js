const express = require('express');
const dashController = require('../controllers/dashController');
const authMiddlewares = require('../middlewares/authMiddlewares');
const router = express.Router();

router.route('/blogDashboard').get(authMiddlewares, dashController.getBlogDashPage);
router.route('/ozellestirDashboard').get(authMiddlewares, dashController.getOzellestirDashPage);
router.route('/createOzellestir').post(dashController.createOzellestir);
router.route('/projelerimDashboard').get(authMiddlewares,dashController.getProjelerimDashPage);
router.route('/createProje').post(dashController.createProje);
router.route('/:_id').delete(dashController.deleteOzellestir);
router.route('/:_id').put(dashController.updateOzellestir);
router.route('/projeDel/:_id').delete(dashController.deleteProje);
router.route('/updateProje/:_id').put(dashController.updateProje);


module.exports = router;