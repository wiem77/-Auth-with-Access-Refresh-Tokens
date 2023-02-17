const router = require('express').Router();
const auth = require('../middeleWare/auth');
const roleCheck = require('../middeleWare/roleCheck');

router.get('/details', auth, roleCheck(['user']), (req, res) => {
  res.status(200).json({ message: 'user authenticated' });
});
module.exports = router;
