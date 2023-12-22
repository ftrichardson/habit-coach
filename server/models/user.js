import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  habits: [],
  friends: [],
});

export const UserModel = mongoose.model('User', userSchema);