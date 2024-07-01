const Room = require('../models/schema/room');
const AllotedRoom = require('../models/schema/allotedRoom');


exports.getAllRooms = async () => {
    return await Room.find({
        $or: [
            { is_deleted: false },
            { is_deleted: { $exists: false } }
        ]
    });
};

exports.getUnAllotedRooms = async () => {
    try {
        const rooms = await Room.aggregate([
            {
                $match: {
                    $or: [
                        { is_deleted: false },
                        { is_deleted: { $exists: false } }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'allotedrooms',
                    localField: '_id',
                    foreignField: 'room',
                    as: 'allotment'
                }
            },
            {
                $match: {
                    'allotment': { $eq: [] }
                }
            },
            {
                $project: {
                    allotment: 0 // Exclude the allotment array from the final result
                }
            }
        ]);

        return rooms;
    } catch (error) {
        console.error("Error fetching unallotted rooms: ", error);
        throw error;
    }
}

// Add a new room
exports.addRoom = async (roomData) => {
    const existingRoom = await Room.findOne({ room_number: roomData.room_number, is_deleted: false });

    if (existingRoom) {
        // If room already exists, return a message or error
        return { error: 'Room with the same room number already exists' };
    }
    else {
        // If no existing room is found, create a new room
        const newRoom = await Room.create(roomData);
        return newRoom;

    }
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