const User = require('../models/schema/user');


exports.getAllUsers = async () => {
    return await User.find({ is_deleted: false });
};

exports.getUserById = async (id) => {
    return await User.findById(id);
};

exports.createUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};

exports.updateUser = async (id, updateData) => {
    const user = await User.findById(id);
    if (!user) return null;
    Object.assign(user, updateData);
    return await user.save();
};

exports.deleteUser = async (id) => {
    const user = await User.findById(id);
    if (!user) return null;
    user.is_deleted = true;
    return await user.save();
};
