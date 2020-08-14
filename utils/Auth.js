const User = require('../models/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {SECRET} = require('../config');

const userRegister = async (userDetails, role, res) => {
  try {
    let usernameTaken = await isTaken('username', userDetails.username);
    if (usernameTaken) return res.status(400).json({message: "Username is taken", success: false});
    let emailTaken = await isTaken('email', userDetails.email);
    if (emailTaken) return res.status(400).json({message: "Email is taken", success: false});
    const hashed = await bcrypt.hash(userDetails.password, 12);
    const user = new User({...userDetails, password: hashed, role});
    await user.save();
    return res.status(201).json({message: "User was created", success: true});
  } catch (e) {
    console.log(e);
    return res.status(500).json({message: "Unable to create", success: false})
  }
};


const userLogin = async (userDetails, role, res) => {
  const {username, password} = userDetails;
  const user = User.findOne({username});
  if (!user) return res.status(400).json({message: "User not found"});

  if (user.role === role) {
    return res.status(403).json({message: "Please make sure you are logging in the right place", success: false});
  }

  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(422).json({message: "Verify your pass or username"});

  let token = jwt.sign({
    userId: user.id,
    role: user.role,
    username: user.username,
    email: user.email
  }, SECRET, {expiresIn: "7 days"});


  return res.status(200).json({ token });


};

const isTaken = async (key, field) => {
  return User.findOne({[key]: field});
};

// const validateUsername = async username => {
//   const user = User.findOne({ username });
//   if(!user) return false;
//   return true;
// };
// const validateEmail = async email => {
//   const user = User.findOne({ email });
//   if(!user) return false;
//   return true;
// };


module.exports = {userRegister};