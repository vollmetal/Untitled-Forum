const jwt = require('jsonwebtoken')
const User = require('../schemas/user')

function authenticate(req, res, next) {

    const headers = req.headers['authorization']
    console.log(headers)
    if (headers) {
        const token = headers.split(' ')[1]
        jwt.verify(token, 'LINUSTORVALDS', function (err, decoded) {
            console.log(decoded)
            if(err) {
                res.json({success: false, message: 'Unable to authenticate!'})
            } else {
                const userId = decoded.id 
                User.findById(userId)
                .then(user => {
                    if(user) {
                        // user is authenticated 
                        // continue with the original request
                        req.body.userId = user.id
                        next() 
                    } else {
                        res.json({success: false, message: 'Unable to authenticate!'})
                    }
                })
            }

        })

    } else {
        res.json({success: false, message: 'Unable to authenticate!'})
    }


}

module.exports = authenticate 