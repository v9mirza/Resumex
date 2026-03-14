const User = require('../models/User');
const Resume = require('../models/Resume');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all resumes
// @route   GET /api/admin/resumes
// @access  Private/Admin
const getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({}).populate('user', 'email').sort({ updatedAt: -1 });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get system stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const resumeCount = await Resume.countDocuments();

        // Calculate new users today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const newUsersToday = await User.countDocuments({ createdAt: { $gte: today } });

        res.json({
            userCount,
            resumeCount,
            newUsersToday
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update user role (admin only)
// @route   PATCH /api/admin/users/:id
// @access  Private/Admin
const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        if (!role || !['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Valid role (user or admin) is required' });
        }
        const targetId = req.params.id;
        if (req.user.id === targetId && role !== 'admin') {
            return res.status(400).json({ message: 'You cannot demote yourself' });
        }
        const user = await User.findById(targetId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.role = role;
        await user.save();
        const updated = await User.findById(user._id).select('-password').lean();
        return res.json(updated);
    } catch (error) {
        console.error('Admin updateUserRole error:', error);
        return res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            // First delete their resumes
            await Resume.deleteMany({ user: req.params.id });
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete resume (admin)
// @route   DELETE /api/admin/resumes/:id
// @access  Private/Admin
const deleteResume = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'Resume ID is required' });
        }

        const resume = await Resume.findById(id);

        if (!resume) {
            // Treat missing resume as a no-op so the admin UI
            // can safely delete already-removed records.
            return res.status(200).json({ message: 'Resume already removed', id });
        }

        await Resume.deleteOne({ _id: id });
        return res.status(200).json({ message: 'Resume removed', id });
    } catch (error) {
        console.error('Admin deleteResume error:', error);
        return res.status(500).json({ message: error.message || 'Server Error' });
    }
};

module.exports = {
    getUsers,
    getResumes,
    getStats,
    updateUserRole,
    deleteUser,
    deleteResume
};
