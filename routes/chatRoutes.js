const express = require('express');
const Message = require('../models/message');
const { userAuth } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/send', userAuth, async (req, res) => {
    const { to, message } = req.body;
    try {
        const msg = new Message({ from: req.user.id, to, message });
        await msg.save();
        res.status(200).send('Message sent');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/messages', userAuth, async (req, res) => {
    try {
        const messages = await Message.find({ to: req.user.id }).populate('from', 'email');
        res.json(messages);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
