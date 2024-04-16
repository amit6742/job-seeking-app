export const sendToken = (user, StatusCode, res, message) => {
  const token =  user.getJWTToken()
  const options = {
    expires: new Date
  }
}