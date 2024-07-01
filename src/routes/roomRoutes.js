const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const { addRoomValidator, updateRoomValidator } = require('../validators/roomValidator')

router.get('', roomController.getAllRooms);

router.get('/unalloted', roomController.getUnAlloted);

// POST /api/rooms - Add a new room
router.post('/', addRoomValidator, roomController.addRoom);

// PUT /api/rooms/:id - Update a room by ID
router.put('/:id', updateRoomValidator, roomController.updateRoom);

// DELETE /api/rooms/:id - Delete a room by ID
router.delete('/:id', roomController.deleteRoom);


module.exports = router;
