const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { getUsers, getResumes, getStats, deleteUser } = require('../controllers/adminController');

router.get('/users', protect, admin, getUsers);
router.get('/resumes', protect, admin, getResumes);
router.get('/stats', protect, admin, getStats);
router.delete('/users/:id', protect, admin, deleteUser);

module.exports = router;
