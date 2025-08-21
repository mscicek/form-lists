import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css'; 
import logo from '../assets/logo.png';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = { 
        // DTO'muz artık ingilizce
        username: username, 
        password: password 
    };
    try {
      // API adresimiz aynı
      const response = await axios.post('https://localhost:7070/api/auth/login', loginData);
      login(response.data);
      navigate('/dashboard');
    } catch (error) {
        console.error("Giriş sırasında hata oluştu:", error.response); // Hatanın tamamını konsola yazdır

        // --- YENİ VE DAHA AKILLI HATA GÖSTERİMİ ---
        let errorMessage = "Giriş başarısız oldu. Lütfen tekrar deneyin.";
        if (error.response && error.response.data) {
            // Eğer backend'den gelen veri bir string ise, doğrudan onu kullan.
            if (typeof error.response.data === 'string') {
                errorMessage = error.response.data;
            } 
            // Eğer bir obje ise (genellikle ASP.NET Core validasyon hataları böyle döner),
            // içindeki 'title' veya 'errors' alanlarını arayabiliriz.
            else if (error.response.data.title) {
                errorMessage = error.response.data.title;
            }
        }
        alert(errorMessage);
        // ------------------------------------------
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="logo-container">
          <img src={logo} alt="Şirket Logosu" className="login-logo" />
        </div>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;