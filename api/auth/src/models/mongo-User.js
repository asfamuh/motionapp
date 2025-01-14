const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Please enter a username'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: [true, 'Please enter a password'],
        minlength: [8, 'Minimum password length is 8 characters'],
    }
});

// Login method for User
userSchema.statics.login = async function (username, password) {
    const user = await this.findOne({ username });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
    }

    throw Error('Incorrect credentials');
}

const User = mongoose.model('user', userSchema);

module.exports = User;