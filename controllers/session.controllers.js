//Controladores de login, logout, y register
const { UserModel } = require("../models/user.model");

const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    let adminInfoUser
    if (!user) {
      console.log('user not found');
      return res.redirect('/');
    }
    if (user.password !== password) {
      console.log('passwords dont match');
      return res.redirect('/');
    }
    if(user.email.includes('@coder.com')){
      adminInfoUser = {...user._doc, admin: true}
    }else{
      adminInfoUser= {...user._doc, admin: false}
    }    
    req.session.user = adminInfoUser;
    req.session.save(err => {
      if (err) console.log('session error => ', err);
      else res.redirect('/profile');
    });
    console.log("updateUser", adminInfoUser)
  };

const registerController = async (req, res, next) => {
try {
    const { email } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
    return res.redirect('/');
    }
    const newuser = await UserModel.create(req.body);
    newuser.email.includes('@coder.com') ? newuser.admin = true : newuser.admin = false ;
    req.session.user = newuser;
    req.session.save(err => {
    if (err) console.log('session error => ', err);
    else {
        res.redirect('/profile')
    };
    });
}
catch(error) {
    console.log(error);
}
};

const logoutController = (req, res, next) => {
    req.session.destroy(err => {
      if (err) {
        console.log(err);
      }
      else {
        res.clearCookie('start-solo');
        res.redirect('/');
      }
    })
  };
  
  module.exports = {loginController, registerController, logoutController}