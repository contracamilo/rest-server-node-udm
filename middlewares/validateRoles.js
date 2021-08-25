const { response } = require("express");

const validateAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({ message: "auth error" });
  }

  const { rol, name } = req.user;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({ message: "insufficient permission" });
  }

  next();
};

const hasRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({ message: "auth error" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        message: `following roles ${roles} are required to complete this action`,
      });
    }

    next();
  };
};

module.exports = {
  validateAdminRole,
  hasRole,
};
