// userTransform.js

// Function to transform user data
const User = (user) => {
    // Destructure the user object and omit __v
    const { __v, ...userWithoutV } = user.toObject ? user.toObject() : user;
    return {
        id: userWithoutV._id,
        name: userWithoutV.name,
        email: userWithoutV.email,
        phone_number: userWithoutV.phone_number,
        room_number: userWithoutV.room_number,
    };
};

// Function to transform an array of users
const UserListResponse = (users) => users.map(User);

module.exports = {
    UserListResponse,
};
