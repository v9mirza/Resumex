const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { registerUser, loginUser, updateUserProfile, deleteAccount } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/profile').put(protect, updateUserProfile).delete(protect, deleteAccount);

module.exports = router;
