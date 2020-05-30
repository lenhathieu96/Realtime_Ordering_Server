const User = require("../Models/userModel");

module.exports.Login = (req, res) => {
  console.log(req.body);
  try {
    User.findOne({ name: req.body.name }, async (err, user) => {
      if (err) throw new err();
      if (!user) {
        return res
          .status(400)
          .json({ message: "authenthication failed !, user not found" });
      }
      if(user.password!==req.body.password){
        return res
        .status(400)
        .json({ message: "authenthication failed !, wrong password" });
      }else{
        return res
        .status(200)
        .json({ message: "authenthication sucess" });
      }
    });
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ message: "authenthication failed !, something wrong" });
  }
};
