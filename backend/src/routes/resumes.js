const express = require('express');
const router = express.Router();
const { getResumes, getResumeById, createResume, updateResume, deleteResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getResumes).post(protect, createResume);
router.route('/:id').get(protect, getResumeById).put(protect, updateResume).delete(protect, deleteResume);

module.exports = router;
