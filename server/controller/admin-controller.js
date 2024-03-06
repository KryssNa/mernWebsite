const User = require("../models/user-model.js");
const Contact = require("../models/contact-model.js");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      res.status(400).json({ msg: "no user found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      res.status(400).json({ msg: "no contact found" });
    }

    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deteled successfully" });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res,next) => {
  try {
    const id = req.params.id;

    const user = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res,next) => {
  try {
    const id = req.params.id;
    const userData = req.body;
    const updatedUser = await User.updateOne({ _id: id }, { $set: userData });

    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contact Deteled successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactById
};
