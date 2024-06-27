const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');


router.get('',  roomController.getAllRooms);

// POST /api/rooms - Add a new room
router.post('/', roomController.addRoom);

// PUT /api/rooms/:id - Update a room by ID
router.put('/:id', roomController.updateRoom);

// DELETE /api/rooms/:id - Delete a room by ID
router.delete('/:id', roomController.deleteRoom);


module.exports = router;
