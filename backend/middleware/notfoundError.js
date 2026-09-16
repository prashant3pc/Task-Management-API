const notfoundError = (req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
};
export default notfoundError;
