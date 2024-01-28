const { verify } = require('jsonwebtoken')
const User = require('../models/user')
const authGuard = async (req, res, next) => {
    // console.log(req.headers.authorization)
    if (req.headers.authorization
        && req.headers.authorization.startsWith('Bearer')) {

        try {
            const token = req.headers.authorization.split(" ")[1];
            console.log(token)
            const {id} = verify(token, process.env.JWT_SECRET_KEY)
            req.user = await User.findById({_id:id});
            if (req.user === null) {
                let error = new Error("User not found");
                error.statusCode = 404
                throw error;
            }
            next()

        } catch (error) {
            next(error)
        }

    }
}

module.exports = { authGuard }