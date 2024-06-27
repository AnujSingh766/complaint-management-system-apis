const Room = require('../models/schema/room');
const AllotedRoom = require('../models/schema/allotedRoom');


exports.getAllUsers = async () => {
    return await Room.find();
};

// Add a new room
exports.addRoom = async (roomData) => {
    return await Room.create(roomData);
};

// Update a room by ID
exports.updateRoom = async (roomId, roomData) => {
    return await Room.findByIdAndUpdate(roomId, roomData, { new: true });
};


// Delete a room by ID
exports.deleteRoom = async (roomId) => {
    // Check if the room is allotted
    const isRoomAllotted = await AllotedRoom.exists({ room: roomId });

    if (isRoomAllotted) {
        // If room is allotted, update is_deleted flag
        return await Room.findByIdAndUpdate(roomId, { is_deleted: true }, { new: true });
    } else {
        // If room is not allotted, delete the room
        return await Room.findByIdAndDelete(roomId);
    }
};