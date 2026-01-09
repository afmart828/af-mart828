const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.post('/signup', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, (req, res) => res.json(req.user));

module.exports = router;
