import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});


const User = models.User || model("User", UserSchema);

export default User;