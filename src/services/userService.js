const AllotedRoom = require('../models/schema/allotedRoom');
const User = require('../models/schema/user');


exports.getAllUsers = async () => {
    // Fetch all users excluding deleted ones and without password
    const users = await User.find({ is_deleted: false }).select('-password');

    // Populate room numbers for each user
    const populatedUsers = await Promise.all(users.map(async (user) => {
        const allotedRoom = await AllotedRoom.findOne({ user: user._id }).populate('room').exec();
        const room_number = allotedRoom ? allotedRoom.room.room_number : null;
        return {
            ...user.toObject(),
            room_number
        };
    }));

    return populatedUsers;
};

exports.getUserById = async (id) => {
    return await User.findById(id);
};

exports.createUser = async (userData) => {

    const userCheck = await User.findOne({ email: userData.email })
    if (userCheck) {
        return ({ alreadyUser: true });
    } else {
        const roomAvialble = await AllotedRoom.findOne({ room: userData.room_id, is_checkout: false });

        if (roomAvialble) {
            return ({ roomAvialble: false });
        }
        const newUser = new User(userData);
        await newUser.save();

        const allotRoomData = { user: newUser._id, room: userData.room_id, }
        const newRoomAllotment = new AllotedRoom(allotRoomData);
        await newRoomAllotment.save();

        return newUser;
    }
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
