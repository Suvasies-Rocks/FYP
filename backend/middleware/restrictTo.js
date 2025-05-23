const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        message: "You don't have permission to do that action ",
      });
      return;
    }
    next();
  };
};

module.exports = restrictTo;
