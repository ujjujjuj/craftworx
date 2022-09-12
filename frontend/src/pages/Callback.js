import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { loginUser } from "../app/authSlice";

const Callback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        let accessToken = searchParams.get("access_token");
        if (!accessToken) return navigate("/login");
        fetch(
            `${process.env.REACT_APP_SERVER_URL}/api/auth/google/callback?access_token=${accessToken}`
        )
            .then((res) => res.json())
            .then((data) => {
                dispatch(loginUser(data));
                navigate("/shop");
            })
            .catch((e) => {
                navigate("/login");
            });
    }, []);
    return <>callback</>;
};

export default Callback;
