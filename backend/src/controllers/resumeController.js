const Resume = require('../models/Resume');

// @desc    Get user resumes
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res) => {
    const resumes = await Resume.find({ user: req.user.id });
    res.status(200).json(resumes);
};

// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Private
const getResumeById = async (req, res) => {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
        res.status(404);
        throw new Error('Resume not found');
    }

    // Allow if owner OR admin
    if (resume.user.toString() !== req.user.id && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('Not authorized');
    }

    res.status(200).json(resume);
};

// @desc    Set resume
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res) => {
    if (!req.body.data) {
        res.status(400);
        throw new Error('Please add a data field');
    }

    const resume = await Resume.create({
        data: req.body.data,
        title: req.body.title || 'Untitled Resume',
        user: req.user.id
    });

    res.status(200).json(resume);
};

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res) => {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
        res.status(404);
        throw new Error('Resume not found');
    }

    const user = req.user;

    // Check for user
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the resume user OR is admin
    if (resume.user.toString() !== user.id && user.role !== 'admin') {
        res.status(401);
        throw new Error('User not authorized');
    }

    // Update fields
    resume.data = req.body.data || resume.data;
    resume.title = req.body.title || resume.title;

    const updatedResume = await resume.save();

    res.status(200).json(updatedResume);
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
        return res.status(404).json({ message: 'Resume not found' });
    }

    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    if (resume.user.toString() !== user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    await resume.deleteOne();

    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getResumes,
    getResumeById,
    createResume,
    updateResume,
    deleteResume
};
