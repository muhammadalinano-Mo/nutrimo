import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/', label: 'Home', emoji: '🏠' },
  { path: '/scan', label: 'Kitchen', emoji: '🥗' },
  { path: '/today', label: 'Today', emoji: '📅' },
  { path: '/history', label: 'History', emoji: '📊' },
];

// Screens where nav should NOT appear
const HIDDEN_ON = ['/results', '/fix', '/today-results'];

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on certain screens
  if (HIDDEN_ON.includes(location.pathname)) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '430px',
        backgroundColor: 'white',
        borderTop: '1px solid #F4ECD8',
        display: 'flex',
        zIndex: 1000,
        boxShadow: '0 -4px 20px rgba(27, 67, 50, 0.08)',
      }}
    >
      {NAV_ITEMS.map(item => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              flex: 1,
              padding: '10px 0 12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              borderTop: isActive
                ? '2px solid #1B4332'
                : '2px solid transparent',
            }}
          >
            <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>
              {item.emoji}
            </span>
            <span style={{
              fontSize: '0.65rem',
              fontWeight: isActive ? 700 : 500,
              color: isActive ? '#1B4332' : '#9CA3AF',
              fontFamily: 'DM Sans, sans-serif',
              letterSpacing: '0.02em',
            }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default BottomNav;