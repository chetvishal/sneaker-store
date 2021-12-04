import { Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

export const PrivateRoute = ({ path, ...props }) => {
    const { isUserLoggedIn } = useAuthContext();
    return isUserLoggedIn ?
        <Route {...props} path={path} /> :
        <Navigate to="/login" state={{ from: path }} replace />
}