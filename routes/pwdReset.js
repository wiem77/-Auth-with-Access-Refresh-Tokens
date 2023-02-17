const Token = require('../models/userToken');
const sendEmail = require('../utils/sendEmails');
const User = require('../models/userModels');

const router = require('express').Router();
const crypto = require('crypto');
const joi = require('joi');

router.post('/', async (req, res) => {
  try {
    const Schema = joi.object({ email: joi.string().email().required() });
    const { error } = Schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send('user with given email does not exist');
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex'),
      }).save();
    }
    const link = `${process.env.DB}/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, 'password reset', link);
    res.send(' pwd reset link send to your mail');
  } catch (error) {
    res.send('AN error occurred');
    console.log(error);
  }
});

router.post('/:userId/:token', async (req, res) => {
  try {
    const schema = joi.object({ password: joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send('invalid link or expired');
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(403).send('invalid Link');
    user.password = req.body.password;
    await user.save();
    await token.delete();
  } catch (error) {
    res.send('an error accrued');
    console.log(error);
  }
});

module.exports = router;
