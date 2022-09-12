import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../app/authSlice";
import { useDispatch } from "react-redux"
const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {   
        dispatch(logoutUser());
        navigate("/login");
    });
    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);

    return null;
};

export default Logout;
