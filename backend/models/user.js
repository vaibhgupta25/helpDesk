const { Schema, model } = require('mongoose')
const { sign } = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    avatar: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        required: false,
    },
}, { timestamps: true });

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10)
    }
    next()
})

userSchema.methods.getToken = async function () {
    return await sign({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn:'30d' })
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    // console.log(this.password)
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = model("HelpDeskUser", userSchema)
module.exports = User