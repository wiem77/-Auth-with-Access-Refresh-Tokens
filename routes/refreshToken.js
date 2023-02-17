const jwt = require('jsonwebtoken');
const UserToken = require('../models/userToken');
const verifyRefreshToken = require('../utils/verifyRefrshToken');
const { refreshToken } = require('../utils/ValidationSchema');
const router = require('express').Router();

//get new access Token
router.post('/', async (req, res) => {
  console.log('1if');
  const { error } = refreshToken(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  verifyRefreshToken(req.body.refreshToken)
    .then(({ tokenDetails }) => {
      const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        { expiresIn: '14m' }
      );
      res.status(200).send({
        error: false,
        accessToken,
        message: 'access Token created succ',
      });
    })
    .catch((err) => res.status(400).send(err));
});
//deleteToken
router.delete('/logout', async (req, res) => {
    try {
      const { error } = refreshToken(req.body);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
  
      const userToken = await UserToken.findOne({ token: req.body.refreshToken });
      if (!userToken) {
        return res.status(200).send({
          error: false,
          message: 'LoggedOUt',
        });
      }
      await userToken.remove();
      res.status(200).send({
        error: false,
        message: 'LoggedOUt succ',
      });
    } catch (err) {
      res.status(500).send(err);
    }
  })
  module.exports = router;