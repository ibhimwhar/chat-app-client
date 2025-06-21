import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router";

export default function Register() {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/auth/register", {
                username: form.username,
                password: form.password,
            });

            // Login after register but store token in sessionStorage (cleared on browser close)
            const loginRes = await API.post("/auth/login", {
                username: form.username,
                password: form.password,
            });

            sessionStorage.setItem("token", loginRes.data.token);  // NOTE: sessionStorage

            alert("Registered and logged in for this session!");
            navigate("/messages");

        } catch (err) {
            alert(err.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-10 p-4 border rounded">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    className="border p-2 rounded"
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
                <input
                    className="border p-2 rounded"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button className="bg-blue-600 text-white p-2 rounded">Register</button>
            </form>
        </div>
    );
}