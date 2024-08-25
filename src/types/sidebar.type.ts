import { ReactNode } from "react";

export type TRoute = {
    path: string;
    element: ReactNode;
};

export type TUserPaths = {
    name: string;
    path?: string;
    element?: ReactNode;
    children?: TUserPaths[];
};

export type TSidebarItems = {
    key: string;
    label: ReactNode;
    children?: TSidebarItems[];
};
