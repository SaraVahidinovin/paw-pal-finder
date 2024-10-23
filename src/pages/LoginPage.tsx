import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'
import { useAuth } from "../context/GlobalAuthContext";
import bannerBackground from '../assets/bannerBackground.svg';
import dogWearingSunglasses from '../assets/dog-wearing-sunglasses.svg';


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
            setErrorMessage('User not found!');
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
      <section className="login-page-container">
      <section className="login-content">
        <section className="form-container">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="field-container">
          <label htmlFor="username">Username:</label>
            <input
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="field-container">
          <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-page-button">Login</button>
        </form>
        {errorMessage && <p id="error-msg">{errorMessage}</p>}
        <p>
          Don't have an account? <a href="/register">Register here!</a>
        </p>
      </section>
      <section className="login-banner">
                <img src={bannerBackground}  className="banner-background" />
                <section className="banner-image-container">
                <img src={dogWearingSunglasses}  className="banner-image" />
                <div className="banner-text">
                    <h3>Join our community and help dogs find their forever homes.</h3>
                </div>
                </section>
            </section>
      </section>
      </section>
    )
}