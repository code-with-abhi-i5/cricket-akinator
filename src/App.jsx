import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GuessPage from './pages/GuessPage';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guess" element={<GuessPage />} />
        </Routes>
      </div>
    </Router>
  );
}
