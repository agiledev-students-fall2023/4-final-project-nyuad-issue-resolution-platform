import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import sanitize from "mongo-sanitize";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  netId: { type: String, required: true, unique: true },
  userType: { type: String, required: true },
  userDept: { type: String }
});

// Hashing the password before saving it to the database
userSchema.pre("save", async function (next) {
  // Sanitize fields
  sanitizeUser(this);

  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Sanitize inputs before updating
userSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  // Sanitize each path in the update object
  Object.keys(update).forEach((path) => {
    if (update[path]) {
      update[path] = sanitize(update[path]);
    }
  });

  next();
});

// Helper function to sanitize user data
function sanitizeUser(user) {
  Object.keys(userSchema.paths).forEach((path) => {
    if (userSchema.paths.hasOwnProperty(path) && user[path]) {
      user[path] = sanitize(user[path]);
    }
  });
}

export default mongoose.model("User", userSchema);
