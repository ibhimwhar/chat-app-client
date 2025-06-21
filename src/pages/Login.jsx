import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", {
                username: form.username,
                password: form.password,
            });

            localStorage.setItem("token", res.data.token); // save token
            navigate("/messages"); // navigate AFTER saving token
        } catch (err) {
            alert(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* your inputs */}
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;