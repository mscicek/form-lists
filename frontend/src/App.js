import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ana yol ('/') için LoginPage bileşenini göster */}
        <Route path="/" element={<LoginPage />} />

        {/* '/dashboard' yolu için DashboardPage bileşenini göster */}
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;