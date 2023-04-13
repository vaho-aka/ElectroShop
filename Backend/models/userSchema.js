import { Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
    default: 'uploads\\avatar.jpg',
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
