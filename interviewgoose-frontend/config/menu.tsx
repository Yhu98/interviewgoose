import {MenuDataItem} from "@ant-design/pro-layout";
import {CrownOutlined} from "@ant-design/icons";
import ACCESS_ENUM from "@/access/accessEnum";

const menus = [
    {
        path: "/",
        name: "Home",
    },
    {
        path: "/questions",
        name: "Questions",
    },
    {
        path: "/topics",
        name: "Topics",
    },
    {
        path: "/admin",
        name: "Administration",
        icon: <CrownOutlined/>,
        access: ACCESS_ENUM.ADMIN,
        children: [
            {
                path: "/admin/user",
                name: "User Administration",
                access: ACCESS_ENUM.ADMIN,
            },
        ],
    },
] as MenuDataItem[];

//
export const findAllMenuItemByPath = (path: string): MenuDataItem | null => {
    return findMenuItemByPath(menus, path);
}

export const findMenuItemByPath = (
    menus: MenuDataItem[],
    path: string
): MenuDataItem | null => {
    for (const menu of menus) {
        if (menu.path === path) {
            return menu;
        }
        if (menu.children) {
            const matchedMenuItem: MenuDataItem | null = findMenuItemByPath(menu.children, path);
            if (matchedMenuItem) {
                return matchedMenuItem;
            }
        }
    }
    return null;
}

export default menus;