const catchAsyncError = (Func) => (req, res, next) => {
  Func(req, res, next).catch(next);
};

export default catchAsyncError;
