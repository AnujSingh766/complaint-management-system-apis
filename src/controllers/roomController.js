const roomService = require('../services/roomService')

exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await roomService.getAllUsers();
        res.status(200).json({
            code: 200,
            message: 'Fetched successfully',
            data: rooms
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            code: 500,
            message: 'Server error',
            data: null
        });
    }
};

// Add a new room
exports.addRoom = async (req, res) => {
    try {
        const reqData = { room_number, floor, capacity, amenities } = req.body;
        const room = await roomService.addRoom(reqData);
        res.status(201).json({
            code: 201,
            message: 'Room added successfully',
            data: room
        });
    } catch (err) {
        console.error('Add room error:', err);
        res.status(500).json({
            code: 500,
            message: 'Server error',
            data: null
        });
    }
};

// Update a room by ID
exports.updateRoom = async (req, res) => {
    const roomId = req.params.id;
    try {
        const { room_number, floor, capacity, amenities } = req.body;
        const updatedRoom = await roomService.updateRoom(roomId, {
            room_number,
            floor,
            capacity,
            amenities
        });
        if (!updatedRoom) {
            return res.status(404).json({
                code: 404,
                message: 'Room not found',
                data: null
            });
        }
        res.status(200).json({
            code: 200,
            message: 'Room updated successfully',
            data: updatedRoom
        });
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
  