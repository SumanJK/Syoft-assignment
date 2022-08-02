const mongoose = require('mongoose')
require('dotenv').config();

console.log(process.env.DATABASE)

module.exports = ()=>{

  mongoose.connect(process.env.DATABASE)
}