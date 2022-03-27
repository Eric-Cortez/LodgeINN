import React, { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css"
import SignupFormModal from "../../../context/SignupFormModal"

function LoginForm({ setShowLoginModal }) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    return (
        <div className="main-div">
            <form className="form-main" onSubmit={handleSubmit}>
                <h2 className="form-title">Log in</h2>
                <div className="error-div-login">
                        {errors.map((error, idx) => (
                                <div className="each-error-div" key={idx}>{`* ${error}`}</div>
                        ))}
                </div>

               <div className="input-div">
                <label
                    className="label"
                    >Email</label>
                   
                    <input
                        type="email"
                        className="input"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </div>

                <div className="input-div">
                    <label
                    className="label"
                    >Password</label>
                        <input
                            className="input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                  
                </div>

                <div className="btn-basic-submit">
                <div className="login-quest">
                    <p className="no-account">Don't have an account? </p>
                        <SignupFormModal setShowLoginModal={setShowLoginModal} type="login"/>
                </div>
                <div className="login-btn-div">
                    <button className="btn-basic" type="submit">Log In</button>
                </div>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;