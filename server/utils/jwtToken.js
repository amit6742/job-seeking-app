export const sendToken = (user, StatusCode, res, message) => {
  const token =  user.getJWTToken()
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  }
  res.status(StatusCode).cookie("token", token, options).json({
    success: true,
    message,
    user,
    token
  })
}
