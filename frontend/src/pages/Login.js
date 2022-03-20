import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../helpers/auth";
import styles from '../styles/components/auth.css';
const Login = () => {
    const [formData, setFormData] = useState({ identifier: "", password: "" });
    const { loginUser } = useAuth();
   const [passVisible, setPassVisible] = useState(false); 
    const navigate = useNavigate();
    const [errorMsg,setError] = useState('');
    const togglePass = ()=>{
        setPassVisible(!passVisible);
    }
    const formSubmit = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/local/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.data === null) {
                    setError('Invalid Email & Password combination')
                    return console.log(data);
                }
            //    loginUser(data);
            //    navigate("/shop");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <>
        <main>
            <h1>Craftworx Agra</h1>
  <h2>Log in</h2>
  <form onSubmit={formSubmit}>
    <input name="email" placeholder="E-mail" type="email" required   value={formData.email}
                    onChange={(e) => setFormData((old) => ({ ...old, identifier: e.target.value }))}/>
   <div className="pass-wrap"><input name="password" placeholder="*******" type={passVisible?"text":"password"} required  onChange={(e) => setFormData((old) => ({ ...old, password: e.target.value }))}/><i class={passVisible?"fas fa-eye-slash":"fas fa-eye"} onClick={togglePass}></i></div>
    <input type="submit" value="Continue"/>
  </form>
  <div className="forgot">
    <a href="">Forgot Password?</a>
  </div>
  <a href={`${process.env.REACT_APP_SERVER_URL}/api/connect/google`} className="google-a">
    <div className="google">
        <img src="/images/google.svg" width="25"/>
         &nbsp;&nbsp; Sign in with Google
      </div>
  </a>
  <div className="login"> 
    Don't have an account? <Link to="/register">Sign up</Link>
  </div>
 <div className="error">
{errorMsg.length?<i class="fas fa-exclamation-circle"></i>:<></>}<p id="error-msg">{errorMsg}</p> 
</div>
</main>
        </>
    );
};

export default Login;
