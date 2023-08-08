import sharp from 'sharp';

export const resizeProductImage = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `prodcut-${req.user._id}-${Date.now()}.png`;

  sharp(req.file.buffer)
    .toFormat('png')
    .png({ quality: 50 })
    .toFile(`uploads/products/${req.file.filename}`);

  next();
};

export const resizeUserImage = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/users/${req.file.filename}`);

  next();
};
