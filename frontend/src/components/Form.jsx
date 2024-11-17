import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import jwt_decode from "jwt-decode";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(""); // Added email for registration
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const data =
                method === "register"
                    ? { username, email, password }
                    : { username, password };

            const res = await api.post(route, data);

            if (method === "login") {
                const { access, refresh } = res.data;

                // Store tokens
                localStorage.setItem(ACCESS_TOKEN, access);
                localStorage.setItem(REFRESH_TOKEN, refresh);

                // Decode token to determine role
                const { role } = jwt_decode(access);

                // Redirect based on role
                role === "admin" ? navigate("/admin") : navigate("/home");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error.response?.data?.detail || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterClick = () => {
        navigate("/register");
    };

    return (
        <div className="form-wrapper">
            <div className="form-logo">
                <i className="fas fa-file-alt"></i>
            </div>
            <form onSubmit={handleSubmit} className="form-container">
                <h1 className="form-title">{name}</h1>
                <input
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                {method === "register" && (
                    <input
                        className="form-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                )}
                <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                {loading && <LoadingIndicator />}
                <button className="form-button" type="submit" disabled={loading}>
                    {loading ? "Loading..." : name}
                </button>
                {method === "login" && (
                    <div className="form-register-link">
                        <span>Don't have an account? </span>
                        <button
                            type="button"
                            className="form-register-button"
                            onClick={handleRegisterClick}
                        >
                            Register
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default Form;
