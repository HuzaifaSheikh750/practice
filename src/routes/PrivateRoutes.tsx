import { Navigate } from "react-router-dom";
import { authService } from "../hook/auth";

const PrivateRoutes = ({children }) => {

    return authService.isLoggedIn() ? children : <Navigate to="/login" />;
    }

export default PrivateRoutes;