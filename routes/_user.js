const router = require("express").Router();
const { userRegister, userLogin } = require("../utils/Auth");
router.post('/register', async(req, res) => {
  await userRegister(req.body, 'user', res);
});

router.post('/register-admin', async(req, res) => {
  await userRegister(req.body, 'admin', res);
});

router.get('/profile', async(req, res) => {});
router.post('/login', async(req, res) => {
  await userLogin(req.body, 'user', res);
});
module.exports = router;