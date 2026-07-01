import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Box, Card, CardContent, TextField, Button, Typography, Alert,
  IconButton, InputAdornment,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  BRAND_COLOR, EMAIL_REGEX, ROUTES,
  ERROR_MESSAGES, BUTTON_LABELS, TIMEOUTS,
} from '../utils/constants.js'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nama: '', email: '', password: '', verify: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const next = {}
    if (!form.nama) next.nama = ERROR_MESSAGES.NAME_REQUIRED
    if (!form.email) {
      next.email = ERROR_MESSAGES.EMAIL_REQUIRED
    } else if (!EMAIL_REGEX.test(form.email)) {
      next.email = ERROR_MESSAGES.EMAIL_INVALID
    }
    if (!form.password) {
      next.password = ERROR_MESSAGES.PASSWORD_REQUIRED
    } else if (form.password.length < 6) {
      next.password = ERROR_MESSAGES.PASSWORD_TOO_SHORT
    }
    if (!form.verify) {
      next.verify = ERROR_MESSAGES.VERIFY_REQUIRED
    } else if (form.verify !== form.password) {
      next.verify = ERROR_MESSAGES.VERIFY_MISMATCH
    }
    setErrors(next)
    const tidakAdaError = Object.keys(next).length === 0
    return tidakAdaError
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setError('')
    setLoading(true)
    try {
      // TODO: implementasi api backend untuk register
      await new Promise((r) => setTimeout(r, TIMEOUTS.REGISTER_DELAY))
      navigate(ROUTES.LOGIN)
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { name: 'nama', label: 'Nama', type: 'text' },
    { name: 'email', label: 'E-mail', type: 'email' },
    { name: 'password', label: 'Kata sandi', type: 'password' },
    { name: 'verify', label: 'Verifikasi kata sandi', type: 'password' },
  ]

  const toggleAdornment = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowPassword((s) => !s)}
          edge="end"
          aria-label="Tampilkan kata sandi"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  }

  return (
    <Box className="min-h-screen bg-[#c8e6c9] flex items-center justify-center p-4">
      <Card className="w-full max-w-[440px]">
        <CardContent className="p-8">
          <Typography variant="h5" className="font-bold text-center mb-6">
            Registrasi
          </Typography>

          <form onSubmit={handleRegister} noValidate>
            {fields.map(({ name, label, type }) => {
              const isPassword = type === 'password'
              return (
                <TextField
                  key={name}
                  name={name}
                  label={label}
                  type={isPassword && showPassword ? 'text' : type}
                  value={form[name]}
                  onChange={handleChange}
                  error={Boolean(errors[name])}
                  helperText={errors[name]}
                  fullWidth
                  slotProps={{
                    htmlInput: { 'data-testid': `input-${name}` },
                    ...(isPassword ? { input: toggleAdornment } : {}),
                  }}
                  className="mb-4"
                />
              )
            })}

            {error && <Alert severity="error" className="mb-4">{error}</Alert>}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loading}
              data-testid="button-daftar"
            >
              {loading ? BUTTON_LABELS.LOADING_REGISTER : BUTTON_LABELS.REGISTER}
            </Button>
          </form>

          <Typography variant="body2" className="text-center mt-4 text-black/60">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-semibold no-underline" style={{ color: BRAND_COLOR }}>
              Login sekarang
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
