/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : creates and verifies json web token
 * @file            : jwt.js
 * @author          : Adithya S Shenoy
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

require('dotenv').config();
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

/**
 * @description generates the jwt token
 * @param {Object} _id 
 * @returns token
 */
exports.generateToken = (_id) => {
  return jwt.sign(
    {
      _id:_id
    },
    process.env.mySecretKey,
    { expiresIn: "1d" }
  );
};


/**
 * @description verifies the jwt token
 * @param {Object} _id 
 * @param {callback} callback
 * @returns token 
 */
exports.verifyToken = (token,callback) => {
   return jwt.verify(token, process.env.mySecretKey,(err,data)=>{
    return err ? callback(err, null) : callback(null, data);
   });
};

/**
 * @description generates random code
 * @returns random code
 */
exports.generateRandomCode = () => {
  return crypto.randomBytes(20).toString('hex');
}


