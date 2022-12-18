const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { login } = require('../controllers/login');
const { validateLogin, validateUserCreate } = require('../middlewares/userValidation');
const auth = require('../middlewares/auth');
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const NotFoundError = require('../utils/errors/NotFoundError'); // 404

router.post('/signin', validateLogin, login);
router.post('/signup', validateUserCreate, createUser);
router.use(auth);
router.use('./cards', cardsRouter);
router.use('./users', usersRouter);
router.use('*', () => { throw new NotFoundError('По вашему запросу ничего не найдено'); });

module.exports = router;
