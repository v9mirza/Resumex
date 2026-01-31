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

module.exports = {
    getUsers,
    getResumes,
    getStats,
    deleteUser
};
