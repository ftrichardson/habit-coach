import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  habits: [],
  friends: [],
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;