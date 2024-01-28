const mongoose = require('mongoose')

const connection = async() => {
    const uri = process.env.URI;
    try {
        await mongoose.connect(uri)
        console.log('DataBase Connected!')
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

module.exports = connection