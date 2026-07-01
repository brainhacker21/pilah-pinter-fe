import { useState } from 'react'
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import TambahSampahPage from './pages/TambahSampahPage'
import AppNavbar from './components/AppNavbar'
import ConfirmDialog from './components/ConfirmDialog'
import { DUMMY_DATA } from './utils/dummy'
import { ROUTES, DIALOG_CONTENT } from './utils/constants.js'

function MainLayout() {
  const navigate = useNavigate()
  const [logoutOpen, setLogoutOpen] = useState(false)
  const totalKoin = DUMMY_DATA.reduce((acc, s) => acc + s.koin, 0)

  const confirmLogout = () => {
    setLogoutOpen(false)
    navigate(ROUTES.LOGIN)
  }

  return (
    <>
      <AppNavbar koin={totalKoin} username="Test" onLogout={() => setLogoutOpen(true)} />
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
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.TAMBAH} element={<TambahSampahPage />} />
      </Route>
    </Routes>
  )
}
