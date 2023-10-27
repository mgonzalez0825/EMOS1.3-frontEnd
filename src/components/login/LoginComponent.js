import React, { useState } from "react";
import { useResolvedPath } from "react-router-dom";
import { useLocalState } from "../../util/useLocalStorage";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [jwt, setJwt] = useLocalState("", "jwt");

    function sendLoginRequest() {
        const reqBody = {
            username: username,
            password: password,
        };
        fetch("api/v1/auth/login", {
            headers: { "Content-Type": "application/json" },
            method: "post",
            body: JSON.stringify(reqBody),
        })
            .then((response) => {
                if (response.status === 200) {
                    return Promise.all([response.json(), response.headers]);
                } else {
                    return Promise.reject("Invalid credentials");
                }
            })
            .then(([body, headers]) => {
                setJwt(headers.get("authorization"));
                const roles = body.roles;

                localStorage.setItem("roles", JSON.stringify(roles));

                window.location.href = "admin/dashboard";
            })
            .catch((message) => {
                alert(message);
            });
    }

    return (
        <div className="login">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Login</h3>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        placeholder='email id'
                                        type="email"
                                        id="username"
                                        className="form-control"
                                        value={username}
                                        onChange={(event) =>
                                            setUsername(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        placeholder='password'
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="text-center mt-4">
                                    <button
                                        id="submit"
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => sendLoginRequest()}
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;