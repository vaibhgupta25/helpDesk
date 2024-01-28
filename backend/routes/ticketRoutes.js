const express = require("express");
const { authGuard } = require("../middlewares/authMiddleware");
const { createTicket, getUserTickets } = require("../controllers/ticketControllers");
const router = express.Router();

router.post('/create', authGuard, createTicket);
router.get('', authGuard, getUserTickets)

module.exports = router;