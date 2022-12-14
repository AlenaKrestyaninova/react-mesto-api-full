const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = require('../utils/key');
const User = require('../models/user');
const { signToken } = require('../utils/jwt');
const AuthError = require('../utils/errors/AuthError'); // 401

//  Проверка логина  //
const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(new AuthError('Wrong email or password'));
        return;
      }
      bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          return next(new AuthError('No such user in DB'));
        }
        const token = signToken(user._id);
        if (!token) return next(new AuthError('Wrong email or password'));
        return res
          .status(200)
          .send({ token, message: 'Authorization succed' });
      });
    })
    .catch((err) => {
      if (err.code === 401) {
        next(new AuthError('Wrong email or password'));
        return;
      }
      next(err);
    });
};

module.exports = { login };

//  Вот так было с куки, пока боюсь удалять  //
// const login = (req, res, next) => {
//   const { email, password } = req.body;
//   User.findOne({ email }).select('+password')
//     .then((user) => {
//       if (!user) {
//         next(new AuthError('Wrong email or password'));
//         return;
//       }
//       bcrypt.compare(password, user.password).then((match) => {
//         if (!match) {
//           return next(new AuthError('No such user in DB'));
//         }
//         const result = signToken(user._id);
//         if (!result) { return next(new AuthError('Wrong email or password')); }
//         return res
//           .status(200)
//           .cookie('authorization', result, {
//             maxAge: 604800,
//             httpOnly: true,
//             sameSite: false,
//             secure: true,
//           })
//           .send({ result, message: 'Authorization succed' });
//       });
//     })
//     .catch((err) => {
//       if (err.code === 401) {
//         next(new AuthError('Wrong email or password'));
//         return;
//       }
//       next(err);
//     });
// };
