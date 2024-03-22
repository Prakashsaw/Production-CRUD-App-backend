import mongoose from "mongoose";

const UserEmailVerificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  //   Expires in 10 minutes
  expires: {
    type: Date,
    default: Date.now,
    index: { expires: 600 },
  },
});

const UserEmailVerificationModel = mongoose.model(
  "userotp",
  UserEmailVerificationSchema
);

export default UserEmailVerificationModel;
