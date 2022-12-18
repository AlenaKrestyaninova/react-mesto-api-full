const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes');
// const cardsRouter = require('./routes/cards');
// const usersRouter = require('./routes/users');
// const { createUser } = require('./controllers/users');
// const { login } = require('./controllers/login');
// const auth = require('./middlewares/auth');
const serverError = require('./utils/serverError');
// const NotFoundError = require('./utils/errors/NotFoundError'); // 404
const { requestLogger, errorLogger } = require('./middlewares/logger');

const options = {
  origin: [
    'http://localhost:3000',
    'https://alenadomain.students.nomoredomains.club',
    'http://alenadomain.students.nomoredomains.club',
    'https://alenakrestyaninova.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-type', 'origin', 'Authorization'],
  credentials: true,
};

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(MONGO_URL);

const app = express();

app.use('*', cors(options));

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', routes);
// app.use(login);
// app.use(createUser);

// app.use(auth);

// app.use(cardsRouter);
// app.use(usersRouter);
// app.use('*', () => { throw new NotFoundError('По вашему запросу ничего не найдено'); });
app.use(errorLogger);
app.use(errors());
app.use(serverError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
