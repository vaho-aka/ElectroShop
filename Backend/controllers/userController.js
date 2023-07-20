import asyncHandler from 'express-async-handler';

import generateToken from '../utils/generateToken.js';
import User from '../models/userSchema.js';

// ** @desc Auth user & get token
// ** @route POST /api/v1/user/auth
// ** @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  res.json({ successs: true, user });
  // if (user && (await user.matchPassword(password))) {
  //   res.json({
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     isAdmin: user.isAdmin,
  //     profilePicture: user.profilePicture,
  //     token: generateToken(user._id),
  //   });
  // } else {
  //   res.status(400);
  //   throw new Error('Email ou mot de pass non valide');
  // }
});

// ** @desc   Register a new user
// ** @route  POST /api/users
// ** @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("L'utilisateur exist déjà");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePicture: user.profilePicture,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Information non valide');
  }
});

// ** @desc   Get user profil
// ** @route  GET /api/users/profil
// ** @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      profilePicture: user.profilePicture,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('Utilisateur non trouvé');
  }
});

// ** @desc   Update user profil
// ** @route  PUT /api/users/profil
// ** @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    console.log(req.body.image);
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.profilePicture = req.body.image ? req.body.image : user.profilePicture;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('Utilisateur non trouvé');
  }
});

// ** @desc   Get All user profil
// ** @route  GET /api/users
// ** @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find({});
  res.json(user);
});

// ** @desc   Delete user profil
// ** @route  DELETE /api/users/:id
// ** @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.delete();
    res.json({ message: "L' utilisateur a été supprimer" });
  } else {
    res.status(404);
    throw new Error('Utilisateur non trouvé');
  }
});

// ** @desc   Get user by id
// ** @route  GET /api/users/:id
// ** @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('Utilisateur non trouvé');
  }
});

// ** @desc   Update user
// ** @route  PUT /api/users/:id
// ** @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('Utilisateur non trouvé');
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
