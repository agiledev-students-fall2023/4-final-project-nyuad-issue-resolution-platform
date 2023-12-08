## Creating Models

Models in Mongoose represent collections in MongoDB and are defined by Schemas. Here is an example of how to define a model.

**File: models/UserModel.js**

_(Keep in mind the file naming convention)_

```JS
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  // Add other fields as necessary
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;

```

## CRUD Operation Examples

### Create

To create a new document in the database:

```JS
import UserModel from '../models/UserModel.js';

export const addUser = async (userData) => {
  try {
    const newUser = await UserModel.create({
      username: userData.username,
      email: userData.email,
      // Other fields
    });

    return newUser;
  } catch (error) {
    // Handle errors
    throw error;
  }
};
```

### Read

For retrieving users, you can create functions to fetch all users or a single user by ID.

```JS
// Read all users
export const findAllUsers = async () => {
  try {
    const users = await UserModel.find({});
    return users;
  } catch (error) {
    // Handle errors
    throw error;
  }
};

// Read a single user by ID
export const findUserById = async (id) => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error) {
    // Handle errors
    throw error;
  }
};
```

### Update

For updating a user, you can use the findByIdAndUpdate method. The { new: true } option returns the updated document.

```JS
// Update a user
export const updateUser = async (id, updateData) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    return updatedUser;
  } catch (error) {
    // Handle errors
    throw error;
  }
};
```

### Delete

For deleting a user, you can use the findByIdAndDelete method.

```JS
// Delete a user
export const deleteUser = async (id) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
    // Handle errors
    throw error;
  }
};
```
