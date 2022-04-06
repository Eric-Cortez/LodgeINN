import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "../Forms/LoginForm/LoginForm.css"
import LoadingSpinner from "../LoadingSpinner";
import "./SignupForm.css"

function SignupForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state?.session?.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [image, setImage] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
     

        if (password === confirmPassword) {
            setErrors([]);
            setIsLoading(true)
            // return dispatch(sessionActions.signup({ email, username, password }))
            return dispatch(sessionActions.createUser({ email, username, password, image }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors){
                        setIsLoading(false)
                         setErrors(data.errors);
                        }
                }).then(()=> {
                    setIsLoading(false)
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <div className="main-div">
            <form className="form-main" onSubmit={handleSubmit}>
                <div className="holds-loader">
                    <h2 className="form-title">Sign up</h2>
                    {isLoading &&
                    <LoadingSpinner />}
                </div>
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
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-div">
                    <label
                        className="label"
                    >Username</label>
                    <input
                        className="input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-div">
                    <label
                        className="label"
                    > Password</label>

                    <input
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="input-div">
                    <label
                        className="label"
                        id="confirm"
                    >Confirm Password</label>
                    <input
                        className="input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                <label
                    className="label"
                >Profile Photo</label>
                    <input
                        className="choose-photo-input"
                        type="file"
                        accept="image/*"
                        required
                        onChange={updateImage}
                    />
                </div>


                <div className="btn-basic-submit">
                    <button className="btn-basic" type="submit">Sign Up</button>
                </div>
                <div>
                    {sessionUser && (
                        <div>
                            <h1>{sessionUser.username}</h1>
                            <img
                                style={{ width: "150px" }}
                                src={sessionUser.imageUrl}
                                alt="profile"
                            />
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default SignupForm;