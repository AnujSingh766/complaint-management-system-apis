const roomService = require('../services/roomService');
const { RoomListResponse } = require('../utils/roomlistResponse');
const { Room } = require('../utils/roomUpdateResponse');

exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await roomService.getAllRooms();
        const response = RoomListResponse(rooms);
        res.status(200).json({ code: 200, message: 'Fetched successfully', data: response });
    } catch (err) {
        console.log(err);
        res.status(500).json({ code: 500, message: 'Server error', data: null });
    }
};
exports.getUnAlloted = async (req, res) => {
    try {
        const rooms = await roomService.getUnAllotedRooms();
        const response = RoomListResponse(rooms);
        res.status(200).json({ code: 200, message: 'Fetched successfully', data: response });
    } catch (err) {
        console.log(err);
        res.status(500).json({ code: 500, message: 'Server error', data: null });
    }
};

// Add a new room
exports.addRoom = async (req, res) => {
    try {
        const reqData = { room_number, floor, capacity, amenities } = req.body;
        const result = await roomService.addRoom(reqData);
        if (result.error) {
            return res.status(409).json({
                code: 409,
                message: result.error,
                data: null
            });
        } else {
            return res.status(201).json({
                code: 201,
                message: 'Room added successfully',
                data: room
            });
        }
    } catch (err) {
        console.error('Add room error:', err);
        return res.status(500).json({
            code: 500,
            message: 'Server error:',
            data: null
        });
    }
};

// Update a room by ID
exports.updateRoom = async (req, res) => {
    const roomId = req.params.id;
    try {
        const reqData = { floor, capacity, amenities } = req.body;
        const updatedRoom = await roomService.updateRoom(roomId, reqData);
        if (!updatedRoom) {
            return res.status(404).json({
                code: 404,
                message: 'Room not found',
                data: null
            });
        } else {
            const response = Room(updatedRoom)
            res.status(200).json({
                code: 200,
                message: 'Room updated successfully',
                data: response
            });
        }
    } catch (err) {
        console.error('Update room error:', err);
        res.status(500).json({
            code: 500,
            message: 'Server error',
            data: null
        });
    }
};

// Delete a room by ID
exports.deleteRoom = async (req, res) => {
    const roomId = req.params.id;
    try {
        const deletedRoom = await roomService.deleteRoom(roomId);
        if (!deletedRoom) {
            return res.status(404).json({
                code: 404,
                message: 'Room not found',
                data: null
            });
        }
        res.status(200).json({
            code: 200,
            message: 'Room deleted successfully',
            data: null
        });
    } catch (err) {
        console.error('Delete room error:', err);
        res.status(500).json({
            code: 500,
            message: 'Server error',
            data: null
        });
    }
};
