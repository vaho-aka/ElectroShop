import asyncHandler from 'express-async-handler';

import generateToken from '../utils/generateToken.js';
import User from '../models/userSchema.js';

// ** @desc Auth user & get token
// ** @route POST /api/v1/user/login
// ** @access Public
export const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user && !(await user.matchPassword(password))) {
    res.status(400);
    throw new Error('Email ou mot de pass non valide');
  }

  const token = generateToken(user._id);

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    profilePicture: user.profilePicture,
    token,
  });
});

// ** @desc   Register a new user
// ** @route  POST /api/users
// ** @access Public
export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("L'utilisateur exist déjà");
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  if (!newUser) {
    res.status(400);
    throw new Error('Information non valide');
  }

  res.status(201).send({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    profilePicture: newUser.profilePicture,
    token: generateToken(newUser._id),
  });
});

// ** @desc   Get user profil
// ** @route  GET /api/users/profil
// ** @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
  res.json({
    _id: req.user._id,
    profilePicture: req.user.profilePicture,
    name: req.user.name,
    email: req.user.email,
  });
});

// ** @desc   Update user profil
// ** @route  PUT /api/users/profil
// ** @access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  req.user.name = req.body.name || req.user.name;
  req.user.email = req.body.email || req.user.email;
  req.user.profilePicture = req.body.image
    ? req.body.image
    : req.user.profilePicture;

  if (req.body.password) {
    req.user.password = req.body.password;
  }

  const updatedUser = await req.user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    profilePicture: updatedUser.profilePicture,
    isAdmin: updatedUser.isAdmin,
    token: generateToken(updatedUser._id),
  });
});

// ** @desc   Get All user profil
// ** @route  GET /api/users
// ** @access Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find({});
  res.json(user);
});

// ** @desc   Delete user profil
// ** @route  DELETE /api/users/:id
// ** @access Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
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
export const getUserById = asyncHandler(async (req, res) => {
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
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isAdmin = req.body.isAdmin || user.isAdmin;

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
