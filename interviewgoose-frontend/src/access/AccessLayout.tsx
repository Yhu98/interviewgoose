import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import {usePathname} from "next/navigation";
import {findAllMenuItemByPath} from "../../config/menu";
import ACCESS_ENUM from "@/access/accessEnum";
import verifyAccess from "@/access/verifyAccess";
import Forbidden from "@/app/forbidden";

/**
 * interceptors for verify access
 * @param children
 * @constructor
 */
const AccessLayout: React.FC<
    Readonly<{
        children: React.ReactNode;
    }>
> = ({ children }) => {
    const pathname = usePathname();
    // currently logged user
    const loginUser = useSelector((state: RootState) => state.loginUser);
    // required access to get the current path
    const menu = findAllMenuItemByPath(pathname);
    const needAccess = menu?.access ?? ACCESS_ENUM.NOT_LOGIN;
    // verify if the user has the valid access
    const haveAccess = verifyAccess(loginUser, needAccess);
    if (!haveAccess) {
        return <Forbidden />
    }
    return children;
};

export default AccessLayout;