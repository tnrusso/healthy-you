// Passport Authentication functions
const isAuthAndAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "Admin") {
    return next();
  }
  return res.json({
    status: "You are not authenticated!",
  });
};

function isAuthAndUser(req, res, next) {
  if (
    req.isAuthenticated() &&
    (req.user.role === "Admin" || req.user.role === "User")
  ) {
    return next();
  }
  return res.json({ status: "You are not authenticated!" });
}

function isAuthAndDoctor(req, res, next) {
  if (
    req.isAuthenticated() &&
    (req.user.role === "Admin" || req.user.role === "Doctor")
  ) {
    return next();
  }
  // console.log("You are not authenticated!");
  return res.json({ status: "You are not authenticated!" });
}

function isAuthAndWriter(req, res, next) {
  if (
    req.isAuthenticated() &&
    (req.user.role === "Admin" || req.user.role === "Writer")
  ) {
    return next();
  }
  // console.log("You are not authenticated!");
  return res.json({ status: "You are not authenticated!" });
}

module.exports = {
  isAuthAndAdmin,
  isAuthAndDoctor,
  isAuthAndUser,
  isAuthAndWriter,
};
