module.exports = {

  HTTP: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  },

  USER: {
    CREATED: "User account created successfully",
    UPDATED: "User account updated successfully",
    DELETED: "User account deleted successfully",
    ERROR_COUNTING_USER: "Server Error, Fail counting users",
    ERROR_SEARCHING_USERS: "Server Error, Fail searching users",
    ERROR_SEARCHING_USER: "Server Error, Fail searching user",
    ERROR_NOT_FOUND: "Not Found, User doesn\'t exist.",
    ERROR_UPDATING_USER: "Server Error, Fail updating the user",
    ERROR_DELETING_USER: "Server Error, Fail deleting the user",
    ERROR_UNAUTHORIZED: "Unauthorized, Invalid email and password combination.",
    ERROR_GENERATING_PASSWORD: "Server Error, Fail generating encrypted password",
    ERROR_ENCRYPTING_PASSWORD: "Server Error, Fail encrypting the password",
    ERROR_DECRYPTING_PASSWORD: "Internal server Error, Fail to decrypt password",
    ERROR_CREATING_USER: "Server Error, Fail creating the User",
    ERROR_MISSING_EMAIL: "Bad Request, Missing parameter 'email' or invalid email sent!",
    ERROR_MISSING_PASSWORD: "Bad Request, Missing parameter 'password' or invalid password sent!",
    ERROR_MISSING_IMAGE_FILE: "Bad Request, missing parameter 'picture' or invalid file sent!",
    ERROR_MISSING_USER_ID: "Bad Request, missing parameter 'usedId'",
    ERROR_MISSING_NAME: "Bad Request, missing parameter 'name', username is required!"
  }
};
