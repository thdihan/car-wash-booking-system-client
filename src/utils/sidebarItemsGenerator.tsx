import { NavLink } from "react-router-dom";
import { TSidebarItems, TUserPaths } from "../types";

export const sideBarItemsGenerator = (items: TUserPaths[], role: string) => {
    const sidebarItems = items.reduce((acc: TSidebarItems[], item) => {
        if (item.path && item.element) {
            acc.push({
                key: item.name,
                label: <NavLink to={`${item.path}`}>{item.name}</NavLink>,
            });
        }

        if (item.children) {
            acc.push({
                key: item.name,
                label: item.name,
                children: item.children.map((child) => ({
                    key: child.name,
                    label: (
                        <NavLink to={`/${role}/${child.path}`}>
                            {child.name}
                        </NavLink>
                    ),
                })),
            });
        }
        return acc;
    }, []);

    return sidebarItems;
};
