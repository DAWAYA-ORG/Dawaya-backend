export const isVerified = (req, res, next) => {
  if (!req.user.isVerified) {
    // redirect new otp.
    res.redirect('/new-otp');
  }
  next();
};
