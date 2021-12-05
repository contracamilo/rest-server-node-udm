const validateFiles = (req, res, next) => {
  const files = req.files;

  if (!files || Object.keys(files).length === 0 || !files.file) {
    res.status(400).json({ message: "file not selected" });
    return;
  }

  next();
};

module.exports = {
  validateFiles,
};
