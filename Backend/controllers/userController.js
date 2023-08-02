import asyncHandler from 'express-async-handler';

import generateToken from '../utils/generateToken.js';
import User from '../models/userSchema.js';
import { sendCookie } from '../utils/sendCookie.js';

// ** @desc Auth user & get token
// ** @route POST /api/v1/user/login
// ** @access Public
export const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    sendCookie(user, res);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      imageUrl: user.imageUrl,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Email ou mot de passe non validés');
  }
});

// ** @desc Log out user
// ** @route POST /api/v1/user/logout
// ** @access Private
export const logOut = asyncHandler(async (req, res) => {
  res.cookie('jwt', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.json({ succes: true });
});

// ** @desc   Register a new user
// ** @route  POST /api/users
// ** @access Public
export const signUp = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("L'utilisateur exist déjà");
  }

  const newUser = await User.create({
    name: userName,
    email,
    password,
  });

  if (!newUser) {
    res.status(400);
    throw new Error('Information non valide');
  }

  sendCookie(newUser, res);
  res.status(201).send({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    imageUrl: newUser.imageUrl,
    token: generateToken(newUser._id),
  });
});

// ** @desc   Get user profil
// ** @route  GET /api/users/profil
// ** @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
  res.json({
    _id: req.user._id,
    imageUrl: req.user.imageUrl,
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
  req.user.imageUrl = req.body.image ? req.body.image : req.user.imageUrl;

  if (req.body.password) {
    req.user.password = req.body.password;
  }

  if (req.file) req.user.imageUrl = req.file.path;

  const updatedUser = await req.user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    imageUrl: updatedUser.imageUrl,
    isAdmin: updatedUser.isAdmin,
    token: generateToken(updatedUser._id),
  });
});

// ** @desc   Get All user profil
// ** @route  GET /api/users
// ** @access Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// ** @desc   Delete user profil
// ** @route  DELETE /api/users/:id
// ** @access Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('Utilisateur non trouvé');
  }

  await User.findByIdAndRemove(user._id);

  res.json({ message: "L' utilisateur a été supprimer" });
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
