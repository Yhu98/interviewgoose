import { MenuDataItem } from "@ant-design/pro-layout";
import menus from "../../config/menu";
import verifyAccess from "@/access/verifyAccess";

/**
 * get menus with permission to access
 * @param loginUser
 * @param menuItems
 */
const getAccessibleMenus = (
  loginUser: API.LoginUserVO,
  menuItems: MenuDataItem[] = menus,
) => {
  return menuItems.filter((item: MenuDataItem) => {
    if (!verifyAccess(loginUser, item.access)) {
      return false;
    }
    if (item.children) {
      item.children = getAccessibleMenus(loginUser, item.children);
    }
    return true;
  });
};

export default getAccessibleMenus;