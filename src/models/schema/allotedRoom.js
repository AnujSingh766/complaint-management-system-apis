const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AllotedRoomSchema = new Schema({
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    check_in_date: { type: Date, required: true, default: Date.now },
    check_out_date: { type: Date, required: false },
    members: { type: [String], required: false },
    is_checkout: { type: Boolean, required: true, default: false }

}, { timestamps: true });

const AllotedRoom = mongoose.model('AllotedRoom', AllotedRoomSchema);

module.exports = AllotedRoom;
