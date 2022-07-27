const { Router } = require('express');
const { loginController } = require('../controllers/login.controller');
const loginMiddleware = require('../middlewares/login.middleware');

const router = Router();

router.post('/', loginMiddleware, loginController);

module.exports = router;