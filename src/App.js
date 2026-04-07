import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './screens/Home';
import Scan from './screens/Scan';
import Results from './screens/Results';
import Fix from './screens/Fix';
import History from './screens/History';
import TodayLog from './screens/TodayLog';
import TodayResults from './screens/TodayResults';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <BrowserRouter>
      <div style={{
        maxWidth: '430px',
        margin: '0 auto',
        minHeight: '100vh',
        backgroundColor: '#FFFBF5',
        position: 'relative',
        boxShadow: '0 0 40px rgba(0,0,0,0.1)',
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/results" element={<Results />} />
          <Route path="/fix" element={<Fix />} />
          <Route path="/history" element={<History />} />
          <Route path="/today" element={<TodayLog />} />
          <Route path="/today-results" element={<TodayResults />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;