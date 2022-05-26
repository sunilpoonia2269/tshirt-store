const cookieToken = (user, res) => {
  const token = user.getJwtToken();

  const options = {
    expire: new Date(
      Date.now() + process.env.COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  user.password = undefined;

  /// Send success Response
  res.status(201).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = cookieToken;
