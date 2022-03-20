import React, { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css"

function LoginForm() {
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
                    className="login-label"
                    > Username or Email</label>
                   
                    <input
                        type="text"
                        className="login-input"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </div>

                <div className="input-div">
                    <label
                    className="login-label"
                    >Password</label>
                        <input
                            className="login-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                  
                </div>

                <div className="btn-basic-submit">
                    <button className="btn-basic" type="submit">Log In</button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;