const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModels');
const {
  signUpValidation,
  loginValidate,
} = require('../utils/ValidationSchema');
const generateAuthToken = require('../utils/generateToken');
//SIgnUP Router
router.post('/signUp', async (req, res) => {
  try {
    console.log("1if");
    const { error } = signUpValidation(req.body);
    if (error) {
     return res.status(400).send({ message: error.details[0].message });
    }
    console.log("2if");
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(409)
        .send({ message: 'user with given email already exist' });
    }
    //Cryptage de PWD

    const salt = await bcrypt.genSalt(Number(process.env.Salt));
    const hashPwd = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPwd }).save();
    res.status(201).send({ message: 'user created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'server err' ,error});
  }
});
//LOGIN
router.post('/login', async (req, res) => {
  try {
    const { error } = loginValidate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if (!validPwd) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    const { accessToken, refreshToken } = await generateAuthToken(user);
    return res.status(200).send({
      accessToken,
      refreshToken,
      message: 'Logged in successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Server error' });
  }
});
module.exports = router;
