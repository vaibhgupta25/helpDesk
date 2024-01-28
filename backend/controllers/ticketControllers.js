const Ticket = require("../models/ticket")

const createTicket = async (req, res, next) => {
    try {
        const { title, description, categoryId } = req.body;

        if (!title || !description || !categoryId) {
            throw new Error("Please Give the necessary Details to create the ticket");
        }

        const user = req.user._id;
        console.log(user)
        if (!user) {
            throw new Error("User Not found")
        }

        const newTicket = await Ticket.create({
            title,
            description,
            categoryId,
            createdBy: user._id,
        });
        console.log(newTicket)
        return res.status(201).json(newTicket)

    } catch (error) {
        next(error)
    }
}

const getUserTickets = async (req, res, next) => {
    try {
        
        const id = req.user._id;
        console.log(id)
        const userTicket = await Ticket.find({ createdBy: id });
        return res.status(200).json(userTicket);
    } catch (error) {
        next(error)
    }

}
module.exports = { createTicket, getUserTickets }