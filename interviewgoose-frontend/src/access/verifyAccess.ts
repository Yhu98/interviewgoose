import ACCESS_ENUM from "@/access/accessEnum";

/**
 * verify if the logged user have a specific access
 * @param loginUser
 * @param needAccess
 * @return boolean
 */
const verifyAccess = (
  loginUser: API.LoginUserVO,
  needAccess = ACCESS_ENUM.NOT_LOGIN,
) => {
  // Check what access the currently logged user have
  // no access, by default, if there is no logged user
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  // need no any access
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  // need to log in to access
  if (needAccess === ACCESS_ENUM.USER) {
    // no access if user not logged in
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  // need to be admin to access
  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};

export default verifyAccess;