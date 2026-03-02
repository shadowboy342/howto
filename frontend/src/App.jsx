import { Link, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import NewsDetailsPage from './pages/NewsDetailsPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? 'theme-dark app' : 'theme-light app'}>
      <header>
        <nav>
          <Link to="/">الرئيسية</Link>
          <Link to="/admin">الإدارة</Link>
          <button onClick={() => setDark((d) => !d)}>{dark ? 'وضع نهاري' : 'وضع ليلي'}</button>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news/:id" element={<NewsDetailsPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}
