import {Navigate} from "react-router";
import {paths} from "./paths.tsx";
import type {ReactNode} from "react";


export const PrivateRoute = ({ children }: { children: ReactNode }) => {
     const checkAuth = () => {
        const token = localStorage.getItem("token");
        return !!token;
    };

    const isAuth = checkAuth();

    if (!isAuth) {
        return <Navigate to={paths.signIn} replace />;
    }

    return children;
};
