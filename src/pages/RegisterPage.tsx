import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMessage("");

        // Validation checks
        if (!name || !username || !email || !password || !confirmPassword) {
            setErrorMessage("All fields are required.");
            return;
        }

        if (password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        // Call the register function
        registerUser(name, username, email, password);
    };

    const registerUser = (name: string, username: string, email: string, password: string) => {
        let users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if the username or email already exists
        const userExists = users.find((user: { username: string }) => user.username === username);
        const emailExists = users.find((user: { email: string }) => user.email === email);

        if (userExists) {
            setErrorMessage("Username already exists.");
            return;
        }

        if (emailExists) {
            setErrorMessage("Email already exists.");
            return;
        }

        // Create a new user object
        const newUser = {
            name,
            username,
            email,
            password: hashPassword(password) // Hashing the password (Base64)
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users)); // Store in local storage

        alert("Registration successful!");
        navigate('/login'); // Redirect to login page
    };

    const hashPassword = (password: string) => {
        return btoa(password); // Simple Base64 encoding for password hashing
    };

    return (
        <section className="form-container">
            <h2 className="form-title">Register your account</h2>
            <form onSubmit={handleSubmit} id="registration-form">
                <div className="field-container">
                <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="field-container">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="field-container">
                <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="field-container">
                <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="field-container">
                <label htmlFor="confirm-password">Confirm password:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign up</button>
            </form>
            {errorMessage && <p id="error-msg">{errorMessage}</p>}
            <p>
                Already have an account? <a href="/login">Login here</a>
            </p>
        </section>
    );
}
