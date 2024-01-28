const {Schema, model} = require('mongoose')

const ticketShema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    categoryId :{
        type:Number,
    },
    assignedTo:{
        type:Number,
        default:null
    },
    status:{
        type:String,
        default:"Open"
    },
    createdBy:{type:Schema.Types.ObjectId,ref:"User"}
},{timestamps:true})

const Ticket = model("ticket",ticketShema);
module.exports = Ticket;