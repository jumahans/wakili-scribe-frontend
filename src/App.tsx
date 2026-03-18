import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

// Dashboard
import DashboardLayout from '@/dashboard/DashboardLayout'
import Overview from '@/dashboard/Overview'
import Dispatch from '@/dashboard/Dispatch'
import Transcripts from '@/dashboard/Transcripts'
import LitigationAI from '@/dashboard/LitigationAI'
import CaseCorpus from '@/dashboard/CaseCorpus'
import Dictionary from '@/dashboard/Dictionary'
import Payments from '@/dashboard/Payments'
import AuditTrail from '@/dashboard/AuditTrail'
import Team from '@/dashboard/Team'
import Settings from '@/dashboard/Settings'

// Pages
import SignIn from '@/pages/signin'
import SignUp from '@/pages/signup'
import Home from '@/pages/Home'
import Features from '@/pages/Features'
import Pricing from '@/pages/Pricing'
import About from '@/pages/About'
import Contact from '@/pages/Contact'

import './App.css'

// ─── Protected Route ───────────────────────────────────────────────────────────
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />
}

// ─── Scroll To Top on Route Change ────────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// ─── Animated Routes ──────────────────────────────────────────────────────────
function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="dispatch" element={<Dispatch />} />
            <Route path="transcripts" element={<Transcripts />} />
            <Route path="litigation" element={<LitigationAI />} />
            <Route path="corpus" element={<CaseCorpus />} />
            <Route path="dictionary" element={<Dictionary />} />
            <Route path="payments" element={<Payments />} />
            <Route path="audit" element={<AuditTrail />} />
            <Route path="team" element={<Team />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Root App ─────────────────────────────────────────────────────────────────
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter basename="/wakili-scribe-frontend">
          <ScrollToTop />
          <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App