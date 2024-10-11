import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
const { hash, compare } = bcrypt;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    draws: { type: Number, default: 0 }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = function(enteredPassword) {
    return compare(enteredPassword, this.password);
};

// Create a User model
const User = model('User', UserSchema);

// Named export for findById and other methods if needed
export const findById = async (id) => {
    return await User.findById(id); // Use the Mongoose model to find by ID
};

// Default export for the User model
export default User;
