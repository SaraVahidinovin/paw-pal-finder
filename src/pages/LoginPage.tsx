import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'
import { useAuth } from "../context/GlobalAuthContext";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState ("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if(!username || !password) {
            setErrorMessage("All fields are required.");
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find ((user:{username: string}) => user.username ===username);

        if (!user) {
            setErrorMessage('User not found.');
            return;
        }
        if (user.password !== btoa(password)) {
            setErrorMessage('Incorrect password.');
            return;
        }

        // Call the login function from the AuthContext
        login(username);
        navigate('/'); // Redirect to home page
    }

    return (
        <section className="form-container">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="field-container">
          <label htmlFor="username">Username</label>
            <input
              name="username"
              id="username"
              placeholder=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="field-container">
          <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p id="error-msg">{errorMessage}</p>}
        <p>
          Don't have an account? <a href="/register">Sign up here</a>
        </p>
      </section>
    )
}