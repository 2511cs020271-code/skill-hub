import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { PublicLayout, AuthLayout, ProtectedLayout } from './components/layout/Layouts';

// Pages
import LandingPage from './pages/Landing/LandingPage';
import { LoginPage, RegisterPage, ForgotPasswordPage } from './pages/Auth/AuthPages';
import Dashboard from './pages/Dashboard/Dashboard';
import { CoursesPage, CourseDetailPage } from './pages/Courses/CoursesPage';
import { ChallengesPage, ChallengeSolvePage } from './pages/Challenges/ChallengesPage';
import { LearningPathsPage } from './pages/LearningPaths/LearningPathsPage';
import { LeaderboardPage } from './pages/Leaderboard/LeaderboardPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { SettingsPage } from './pages/Settings/SettingsPage';
import { NotificationsPage } from './pages/Notifications/NotificationsPage';
import { CommunityPage } from './pages/Community/CommunityPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            {/* Public Landing Page */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
            </Route>

            {/* Auth Pages (Login / Register) */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Route>

            {/* Protected Dashboard & App Pages */}
            <Route element={<ProtectedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:courseId" element={<CourseDetailPage />} />
              <Route path="/challenges" element={<ChallengesPage />} />
              <Route path="/challenges/:challengeId" element={<ChallengeSolvePage />} />
              <Route path="/learning-paths" element={<LearningPathsPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/community" element={<CommunityPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
