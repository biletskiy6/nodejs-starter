const router = require('express').Router();
const User = require('../models/User');
router.get('/', async(req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ message: "Hurray", data: users })
  } catch (e) {
    return res.status(500).json({ message: "Smth go wrong with the server" });
  }
});

router.get('/:id', async(req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);

    if(!user) {
      return res.status(404).json({ message: "Not found" })
    }
    return res.status(200).json({ message: "Hurray", data: user })
  } catch (e) {
    return res.status(500).json({ message: "Smth go wrong with the server" });
  }
});

router.patch('/:id', async(req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndUpdate({ _id }, {
      name: "UPDATED NAME2"
    }, { new: true, runValidators: true});

    if(!user) {
      return res.status(404).json({ message: "Not found" })
    }
    return res.status(200).json({ message: "Updated", user})

  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Smth go wrong with the server" });
  }
});


module.exports = router;