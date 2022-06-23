import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";

const Logout = () => {
    const navigate = useNavigate();
    const { logoutUser } = useAuth();

    useEffect(() => {
        logoutUser();
        navigate("/login");
    });
    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);

    return null;
};

export default Logout;
