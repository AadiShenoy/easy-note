const jwt = require("jsonwebtoken");

exports.generateToken = (email) => {
  return jwt.sign(
    {
      email: email,
    },
    "secret",
    { expiresIn: "1h" }
  );
};

exports.verifyToken = (token,callback) => {
   return jwt.verify(token, "secret",(err,data)=>{
    return err ? callback(err, null) : callback(null, data);
   });
};
