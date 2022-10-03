import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { loginUser } from "../app/authSlice";
import { ThreeDots } from "react-loader-spinner";
import updateUserDb from "../api/update";

const toTitleCase = (str) => {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

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
            .then(async (data) => {
                if (!data.error) {
                    if (!(data.user.firstName)) {
                        let req = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${accessToken}`,
                            }
                        });
                        let res = await req.json();
                        if (res) {
                            data.user.firstName = toTitleCase(res.given_name ?? "")
                            data.user.lastName = toTitleCase(res.family_name ?? "")
                            await updateUserDb({
                                firstName: data.user.firstName,
                                lastName: data.user.lastName,
                            }, data.jwt, data.user.id)
                        }
                    }
                    dispatch(loginUser(data));
                    navigate("/shop");
                } else {
                    navigate("/login", {
                        state: {
                            error: data.error.message
                        }
                    })
                }
            })
            .catch((e) => {
                console.log(e)
                navigate("/login");
            });
    }, []);
    return <>
        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <ThreeDots
                height="15"
                width="60"
                radius="20"
                color="#54605F"
                ariaLabel="three-dots-loading"
                wrapperClassName=""
                visible={true}
            />
            <p style={{ marginTop: "15px", fontSize: "17px" }}>Setting up your profile..</p>
        </section>
    </>;
};

export default Callback;
