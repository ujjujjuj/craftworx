import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../helpers/auth";

const Logout = () => {
    const navigate = useNavigate();
    const { logoutUser } = useAuth();

    useEffect(() => {
        logoutUser();
        navigate("/login");
    });

    return null;
};

export default Logout;
