const jwt = require('jsonwebtoken');

const isAuth = (req,res,next) => {
    const token = req.headers.authorization
    if(token) {
        jwt.verify(token,process.env.JWT_SECRET,(err,user) => {
            if (err) {
                res.status(403).send({message:"Invalid Token!"});
              }else {
                req.user = user
                next()
              }
        })
    }else {
    return res.status(401).send({message:"You are not authenticated!"});
    }
}

module.exports = isAuth