import { MenuDataItem } from "@ant-design/pro-layout";
import { CrownOutlined } from "@ant-design/icons";

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
    icon: <CrownOutlined />,
    children: [
      {
        path: "/admin/user",
        name: "User Administration",
      },
    ],
  },
] as MenuDataItem[];

export default menus;