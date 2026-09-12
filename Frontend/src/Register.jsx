import { useState } from "react";

function Register({ onRegister }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:8080/api/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.error);
                return;
            }

            alert("Registration successful!");

            // Sign Up form close hoga
            if (onRegister) {
                onRegister();
            }

            // Form clear hoga
            setName("");
            setEmail("");
            setPassword("");

        } catch (error) {

            console.error("Register Error:", error);
            alert("Something went wrong");

        }
    };

    return (
        <div className="auth-form">

            <h2>Sign Up</h2>

            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Sign Up
                </button>

            </form>

        </div>
    );
}

export default Register;