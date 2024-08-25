import { ReactNode } from "react";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = useAppSelector(useCurrentToken);

    if (!token) return <Navigate to="/login" />;
    return children;
};

export default ProtectedRoute;
