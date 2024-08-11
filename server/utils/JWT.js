const jwt = require('jsonwebtoken');
const secret = 'qiumenglv';
const JWT = {
  generate: (data,exprires) => {
    return jwt.sign(data, secret, { expiresIn: exprires });
  },
  //解密
  verify: (token) => {
    return  jwt.verify(token, secret, (err, data) => {
      if (err) {
        return false;
      }
      return data;
    });
  }
        
}
//test
// let token = JWT.generate({username:'qiumenglv'},'1h');
// console.log(JWT.verify(token));
module.exports = JWT;