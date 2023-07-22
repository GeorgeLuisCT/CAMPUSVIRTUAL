const {Router} = require('express');
const router = Router();

const {renderSigninForm, signin, logout} = require('../controllers/users.controllers')
const {isNotAuthenticated } = require('../helpers/auth');

router.get(('/users/signin'),isNotAuthenticated, renderSigninForm);
router.post(('/users/signin'), signin);
router.get(('/users/logout'), logout);

module.exports = router;