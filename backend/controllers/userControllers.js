const User = require('../models/user')
const userRegister = async (req, res, next) => {
    try {
        let { name, email, password } = req.body;
        console.log(password)
        email = email.toLowerCase();
        let user = await User.findOne({ email });
        console.log(email)
        if (user) {
            throw new Error("User Already Exists")
        }

        user = await User.create({
            name,
            email,
            password
        })

        return res.status(200).json({
            _id: user._id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            verified: user.verified,
            admin: user.admin,
            token: await user.getToken(),
        })
    } catch (error) {
        next(error)
    }



}

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Invalid Credentials!");
        }
        const match = await user.comparePassword(password)

        if (!match) {
            throw new Error("Invalid Credentials!");
        }

        return res.status(200).json({
            _id: user._id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            verified: user.verified,
            admin: user.admin,
            token: await user.getToken(),
        })

    } catch (error) {
        next(error);
    }



}

module.exports = { userRegister, userLogin }