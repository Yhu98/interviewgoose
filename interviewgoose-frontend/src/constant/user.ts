import ACCESS_ENUM from "@/access/accessEnum";

// Default User
export const DEFAULT_USER: API.LoginUserVO = {
    userName: "Not logged in",
    userProfile: "Nothing to say here ......",
    userAvatar: "/assets/notLoginUser.png",
    userRole: ACCESS_ENUM.NOT_LOGIN,
};