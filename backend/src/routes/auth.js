const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { protect } = require('../middleware/authMiddleware');
const { registerUser, loginUser, updateUserProfile, deleteAccount, revokeAllSessions } = require('../controllers/authController');

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const first = errors.array()[0];
        return res.status(400).json({ message: first.msg });
    }
    next();
};

const registerValidators = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email address'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
];

const loginValidators = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email address'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required'),
];

router.post('/register', registerValidators, handleValidation, registerUser);
router.post('/login', loginValidators, handleValidation, loginUser);
router.route('/profile').put(protect, updateUserProfile).delete(protect, deleteAccount);
router.post('/revoke-all', protect, revokeAllSessions);

module.exports = router;
