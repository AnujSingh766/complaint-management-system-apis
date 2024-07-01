const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  room_number: { type: Number, required: true, unique: true },
  floor: { type: Number, required: true },
  capacity: { type: Number, required: true },
  amenities: { type: [String], required: false },
  is_deleted: { type: Boolean, default: false }
}, { timestamps: true });

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
