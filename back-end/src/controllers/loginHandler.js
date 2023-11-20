import bcrypt from "bcryptjs";
import User from "../../models/UserModel.js";

// Previous Hardcoded values
// const student = { username: "s", password: "1" };
// const admin = { username: "a", password: "1" };

export async function loginStudentHandler(req, res) {
  // previous implementation
  // if (
  //   req.body.username === student.username &&
  //   req.body.password === student.password
  // ) {
  //   res.status(200).json({ authenticated: true });
  // } else {
  //   res.status(200).json({ authenticated: false });
  // }

  try {
    const { username, password } = req.body;
    // for case insensitive search
    const user = await User.findOne({
      netId: { $regex: new RegExp(username, "i") }
    });
    if (!user) {
      return res.status(200).send({ authenticated: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).send({ authenticated: false });
    }
    if (user.userType !== "student") {
      return res.status(200).send({ authenticated: false });
    }

    // User is authenticated, return user data
    // Exclude password from the returned data
    const userData = {
      authenticated: true,
      ...user._doc,
      password: undefined,
      _id: undefined
    };
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function loginAdminHandler(req, res) {
  // if (
  //   req.body.username === admin.username &&
  //   req.body.password === admin.password
  // ) {
  //   res.json({ authenticated: true });
  // } else {
  //   res.json({ authenticated: false });
  // }

  try {
    const { username, password } = req.body;
    // for case insensitive search
    const user = await User.findOne({
      netId: { $regex: new RegExp(username, "i") }
    });
    if (!user) {
      return res.status(200).send({ authenticated: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).send({ authenticated: false });
    }
    if (user.userType !== "admin") {
      return res.status(200).send({ authenticated: false });
    }

    // User is authenticated, return user data
    // Exclude password from the returned data
    const userData = {
      authenticated: true,
      ...user._doc,
      password: undefined,
      _id: undefined
    };
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
