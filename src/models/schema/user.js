
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone_number: { type: Number, required: true },
    is_admin: { type: Boolean, required: true, default: false },
    first_login: { type: Boolean, required: true, default: true },
    otp_login: { type: Boolean, required: true, default: false },
    is_deleted: { type: Boolean, required: true, default: false },
}, { timestamps: true });

// Hash password before saving to database
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (err) {
        return next(err);
    }
});

module.exports = mongoose.model('User', UserSchema);
