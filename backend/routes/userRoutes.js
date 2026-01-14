const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// User registration
router.post('/signup', registerUser);

// User login (regular users, not admin)
router.post('/login', authUser);

// Get user profile
router.get('/profile', protect, (req, res) => res.json(req.user));

// Update user profile
router.put('/profile', protect, async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = router;
