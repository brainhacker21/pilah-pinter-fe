import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box, Card, Button, TextField, Typography, Avatar, Alert,
} from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import ConfirmDialog from '../components/ConfirmDialog'
import { useAuth } from '../context/AuthContext'
import { klasifikasiSampah } from '../services/sampahService'
import {
    ROUTES, BUTTON_LABELS, BRAND_COLOR, TEXT_CONTENT, DIALOG_CONTENT,
} from '../utils/constants.js'


export default function TambahSampahPage() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [preview, setPreview] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [berat, setBerat] = useState('')
    const [errorBerat, setErrorBerat] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [confirmOpen, setConfirmOpen] = useState(false)

    const readImage = (file) => {
        if (!file?.type.startsWith('image/')) return
        setSelectedFile(file)
        const reader = new FileReader()
        reader.onload = (ev) => setPreview(ev.target?.result)
        reader.readAsDataURL(file)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        readImage(e.dataTransfer.files[0])
    }

    const validate = () => {
        if (!berat.trim()) {
            setErrorBerat('Berat wajib diisi.')
            return false
        }
        if (isNaN(Number(berat)) || Number(berat) <= 0) {
            setErrorBerat('Berat harus angka positif.')
            return false
        }
        if (!selectedFile) {
            alert('Silakan upload gambar terlebih dahulu.')
            return false
        }
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return
        setConfirmOpen(true)
    }

    const handleConfirm = async () => {
        setLoading(true)
        try {
            const { data } = await klasifikasiSampah(selectedFile, berat)
            const hasil = data.data
            setConfirmOpen(false)
            setSuccess(`Sampah terdeteksi sebagai "${hasil.kategori}" — ${hasil.nominal.toLocaleString('id-ID')} Koin`)
            setTimeout(() => navigate(ROUTES.HOME), 1500)
        } catch (err) {
            setConfirmOpen(false)
            alert(err.response?.data?.message || 'Gagal mengklasifikasikan sampah')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box className="min-h-screen bg-[#c8e6c9]">
            <Box className="p-4 sm:p-6 max-w-[960px] mx-auto">
                <Card className="mb-4 sm:mb-5 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    <Avatar className="bg-[#e8f5e9] w-11 h-11">
                        <FileUploadIcon style={{ color: BRAND_COLOR }} />
                    </Avatar>
                    <Box className="flex-1">
                        <Typography variant="body1" className="font-semibold">
                            Dapatkan koin untuk tentukan jenis sampah
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Siapkan file gambar atau kamera anda
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(ROUTES.HOME)}
                        className="w-full sm:w-auto"
                    >
                        Ambil
                    </Button>
                </Card>

                <Card>
                    <Box className="p-4 sm:p-6 flex flex-col md:flex-row gap-5 md:gap-6">
                        <Box className="flex-1 flex flex-col md:justify-center">
                            <Box
                                component="label"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                                className="border-2 border-dashed border-[#c8e6c9] rounded-2xl bg-[#e8f5e9] h-[200px] sm:h-[260px] flex flex-col items-center justify-center cursor-pointer relative overflow-hidden transition-colors duration-200 hover:border-[#388e3c]"
                                data-testid="upload-area"
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => readImage(e.target.files?.[0])}
                                    data-testid="input-file"
                                />
                                {preview ? (
                                    <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <AddPhotoAlternateIcon className="text-[48px] sm:text-[56px] text-[#388e3c] mb-3" />
                                        <Typography variant="body1" className="font-semibold text-center px-4">
                                            Ambil foto langsung
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" className="mt-1 text-center px-4">
                                            atau{' '}
                                            <span className="text-[#388e3c] font-semibold cursor-pointer">
                                                tambah file gambar anda
                                            </span>
                                        </Typography>
                                    </>
                                )}
                            </Box>
                            {preview && (
                                <Typography variant="caption" color="text.secondary" className="block text-center mt-2">
                                    Klik untuk ganti gambar
                                </Typography>
                            )}
                        </Box>

                        <Box className="w-full md:w-[280px] flex flex-col">
                            <Typography variant="subtitle1" className="font-bold mb-4">
                                Form
                            </Typography>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1" noValidate>
                                <TextField
                                    name="berat"
                                    label="Berat (Kg)"
                                    type="number"
                                    value={berat}
                                    onChange={(e) => { setBerat(e.target.value); setErrorBerat('') }}
                                    error={Boolean(errorBerat)}
                                    helperText={errorBerat}
                                    fullWidth
                                    slotProps={{ htmlInput: { 'data-testid': 'input-berat', min: 0, step: 0.1 } }}
                                />

                                {success && <Alert severity="success">{success}</Alert>}

                                <Box className="mt-4 md:mt-auto">
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                        disabled={loading}
                                        data-testid="button-submit"
                                    >
                                        {loading ? BUTTON_LABELS.LOADING_SUBMIT : BUTTON_LABELS.SUBMIT}
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Card>
            </Box>

            <ConfirmDialog
                open={confirmOpen}
                title={DIALOG_CONTENT.SUBMIT.TITLE}
                body={DIALOG_CONTENT.SUBMIT.BODY}
                confirmLabel={DIALOG_CONTENT.SUBMIT.CONFIRM}
                cancelLabel={DIALOG_CONTENT.SUBMIT.CANCEL}
                loading={loading}
                onConfirm={handleConfirm}
                onCancel={() => setConfirmOpen(false)}
            />
        </Box>
    )
}
