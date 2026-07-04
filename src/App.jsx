import { useState } from 'react'
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import TambahSampahPage from './pages/TambahSampahPage'
import AppNavbar from './components/AppNavbar'
import ConfirmDialog from './components/ConfirmDialog'
import { useAuth } from './context/AuthContext'
import { ROUTES, DIALOG_CONTENT } from './utils/constants.js'

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return null
  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />
}

function AuthRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return null
  return isAuthenticated ? <Navigate to={ROUTES.HOME} replace /> : children
}

function MainLayout() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [logoutOpen, setLogoutOpen] = useState(false)

  const confirmLogout = async () => {
    setLogoutOpen(false)
    await logout()
    navigate(ROUTES.LOGIN)
  }

  return (
    <>
      <AppNavbar onLogout={() => setLogoutOpen(true)} />
      <Outlet />
      <ConfirmDialog
        open={logoutOpen}
        title={DIALOG_CONTENT.LOGOUT.TITLE}
        body={DIALOG_CONTENT.LOGOUT.BODY}
        confirmLabel={DIALOG_CONTENT.LOGOUT.CONFIRM}
        cancelLabel={DIALOG_CONTENT.LOGOUT.CANCEL}
        onConfirm={confirmLogout}
        onCancel={() => setLogoutOpen(false)}
      />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
      <Route path={ROUTES.LOGIN} element={<AuthRoute><LoginPage /></AuthRoute>} />
      <Route path={ROUTES.REGISTER} element={<AuthRoute><RegisterPage /></AuthRoute>} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.TAMBAH} element={<TambahSampahPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
