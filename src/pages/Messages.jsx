import { useEffect, useState } from "react";
import API from "../api";
import { LogOut, Send } from "lucide-react";
import MessageCard from "../components/MessageCard";

export default function Messages() {
    const [users, setUsers] = useState([]);
    const [to, setTo] = useState(""); // recipient user ID
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);

    // Fetch all users on first load
    useEffect(() => {
        API.get("/auth/users").then((res) => setUsers(res.data));
    }, []);

    // Fetch messages between current user and selected recipient
    useEffect(() => {
        if (to) {
            API.get(`/messages?withUser=${to}`).then((res) => setMessages(res.data));
        } else {
            setMessages([]); // Clear messages if no recipient selected
        }
    }, [to]);

    const send = async () => {
        if (!text || !to) return;
        const res = await API.post("/messages", { text, to });
        setMessages((prev) => [...prev, res.data]);
        setText("");
    };

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/register";
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Messages</h2>
                <button onClick={logout}>
                    <LogOut className="text-red-500" />
                </button>
            </div>

            {/* Recipient selector */}
            <select
                className="border p-2 rounded w-full mb-2"
                value={to}
                onChange={(e) => setTo(e.target.value)}
            >
                <option value="">Select user to chat with</option>
                {users.map((user) => (
                    <option key={user._id} value={user._id}>
                        {user.username}
                    </option>
                ))}
            </select>

            {/* Messages list */}
            <div className="border rounded p-2 mb-4 max-h-64 overflow-y-auto bg-white">
                {messages.length === 0 && to && (
                    <div className="text-gray-500 text-sm">No messages yet.</div>
                )}
                {messages.map((msg) => (
                    <MessageCard key={msg._id} msg={msg} />
                ))}
            </div>

            {/* Update */}
            <div className="overflow-y-auto border rounded p-2 bg-white max-h-64 mb-4">
                {messages.length === 0 && to && (
                    <div className="text-gray-400 text-sm">No messages with this user.</div>
                )}
                {messages.map((msg) => (
                    <MessageCard key={msg._id} msg={msg} />
                ))}
            </div>


            {/* Message input */}
            {to && (
                <div className="flex gap-2">
                    <input
                        className="border flex-1 p-2 rounded"
                        placeholder="Type a message"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        className="bg-blue-600 text-white p-2 rounded flex items-center"
                        onClick={send}
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}