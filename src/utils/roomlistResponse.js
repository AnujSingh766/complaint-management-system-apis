
const Room = (room) => {
    const { __v, ...roomWithoutV } = room.toObject ? room.toObject() : room;
    return {
        id:  roomWithoutV._id,
        room_number: roomWithoutV.room_number,
        floor: roomWithoutV.floor,
        capacity: roomWithoutV.capacity,
    };
};

// Function to transform an array of users
const RoomListResponse = (rooms) => rooms.map(Room);

module.exports = {
    RoomListResponse,
};
