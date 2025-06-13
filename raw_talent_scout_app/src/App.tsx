import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

// Layout components
import AppLayout from './components/layout/AppLayout';

// Lazy load pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const GymMap = lazy(() => import('./pages/GymMap'));
const FighterDatabase = lazy(() => import('./pages/FighterDatabase'));
const ScoutingHub = lazy(() => import('./pages/ScoutingHub'));
const ShowManager = lazy(() => import('./pages/ShowManager'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Settings = lazy(() => import('./pages/Settings'));
const UIShowcasePage = lazy(() => import('./pages/UIShowcasePage'));
const PremiumUIPage = lazy(() => import('./pages/PremiumUIPage'));

// Loading component for suspense fallback
const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%'
    }}
  >
    <CircularProgress color="primary" />
  </Box>
);

const App: React.FC = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/map" element={<GymMap />} />
            <Route path="/fighters" element={<FighterDatabase />} />
            <Route path="/scouting" element={<ScoutingHub />} />
            <Route path="/show" element={<ShowManager />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/ui-showcase" element={<UIShowcasePage />} />
            <Route path="/premium-ui" element={<PremiumUIPage />} />
            {/* Fallback for unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Box>
  );
};

export default App;
