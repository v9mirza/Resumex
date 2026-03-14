const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { getUsers, getResumes, getStats, updateUserRole, deleteUser, deleteResume } = require('../controllers/adminController');

router.get('/users', protect, admin, getUsers);
router.get('/resumes', protect, admin, getResumes);
router.get('/stats', protect, admin, getStats);
router.patch('/users/:id', protect, admin, updateUserRole);
router.delete('/users/:id', protect, admin, deleteUser);
router.delete('/resumes/:id', protect, admin, deleteResume);

module.exports = router;
