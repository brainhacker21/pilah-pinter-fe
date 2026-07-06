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
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [hasil, setHasil] = useState(null)

    // Berat harus valid (angka positif) sebelum upload gambar diizinkan.
    const beratValid = berat.trim() !== '' && !isNaN(Number(berat)) && Number(berat) > 0
    // Setelah "Hitung" berhasil, tombol berubah menjadi "Submit".
    const sudahHitung = Boolean(hasil)

    // Gambar baru / berat berubah membatalkan hasil hitung sebelumnya.
    const resetHasil = () => {
        if (hasil) setHasil(null)
    }

    const readImage = (file) => {
        if (!beratValid) return
        if (!file?.type.startsWith('image/')) return
        setSelectedFile(file)
        resetHasil()
        const reader = new FileReader()
        reader.onload = (ev) => setPreview(ev.target?.result)
        reader.readAsDataURL(file)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        if (!beratValid) return
        readImage(e.dataTransfer.files[0])
    }

    const handleBeratChange = (e) => {
        setBerat(e.target.value)
        setErrorBerat('')
        resetHasil()
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

    // Langkah "Hitung": panggil API klasifikasi lalu tampilkan hasilnya.
    const handleHitung = async () => {
        if (!validate()) return
        setLoading(true)
        try {
            const { data } = await klasifikasiSampah(selectedFile, berat, user?.id)
            setHasil(data.data)
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal mengklasifikasikan sampah')
        } finally {
            setLoading(false)
        }
    }

    // Langkah "Submit": buka dialog konfirmasi.
    const handleSubmit = (e) => {
        e.preventDefault()
        if (sudahHitung) {
            setConfirmOpen(true)
        } else {
            handleHitung()
        }
    }

    // Konfirmasi "iya" → redirect ke home.
    const handleConfirm = () => {
        setConfirmOpen(false)
        setTimeout(() => navigate(ROUTES.HOME), 1500)
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
                                className={`border-2 border-dashed rounded-2xl bg-[#e8f5e9] h-[200px] sm:h-[260px] flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-200 ${beratValid
                                    ? 'border-[#c8e6c9] cursor-pointer hover:border-[#388e3c]'
                                    : 'border-[#c8e6c9] cursor-not-allowed opacity-60'}`}
                                aria-disabled={!beratValid}
                                data-testid="upload-area"
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    disabled={!beratValid}
                                    onChange={(e) => readImage(e.target.files?.[0])}
                                    data-testid="input-file"
                                />
                                {preview ? (
                                    <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <AddPhotoAlternateIcon className="text-[48px] sm:text-[56px] text-[#388e3c] mb-3" />
                                        {beratValid ? (
                                            <>
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
                                        ) : (
                                            <Typography variant="body2" color="text.secondary" className="mt-1 text-center px-4">
                                                Isi berat terlebih dahulu untuk mengunggah gambar
                                            </Typography>
                                        )}
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
                                    onChange={handleBeratChange}
                                    error={Boolean(errorBerat)}
                                    helperText={errorBerat}
                                    fullWidth
                                    slotProps={{ htmlInput: { 'data-testid': 'input-berat', min: 0, step: 0.1 } }}
                                />

                                {hasil && (
                                    <Box className="rounded-xl bg-[#e8f5e9] p-3 flex flex-col gap-1" data-testid="hasil-hitung">
                                        <Box className="flex justify-between">
                                            <Typography variant="body2" color="text.secondary">Kategori</Typography>
                                            <Typography variant="body2" className="font-semibold capitalize">{hasil.kategori}</Typography>
                                        </Box>
                                        <Box className="flex justify-between">
                                            <Typography variant="body2" color="text.secondary">Harga / Kg</Typography>
                                            <Typography variant="body2" className="font-semibold">{hasil.hargaPerKg.toLocaleString('id-ID')} Koin</Typography>
                                        </Box>
                                        <Box className="flex justify-between">
                                            <Typography variant="body2" color="text.secondary">Total</Typography>
                                            <Typography variant="body2" className="font-bold" style={{ color: BRAND_COLOR }}>{hasil.nominal.toLocaleString('id-ID')} Koin</Typography>
                                        </Box>
                                    </Box>
                                )}
                                <Box className="mt-4 md:mt-auto">
                                    <Button
                                        type="submit"
                                        variant={sudahHitung ? 'contained' : 'outlined'}
                                        color="primary"
                                        fullWidth
                                        disabled={loading}
                                        data-testid="button-submit"
                                    >
                                        {loading
                                            ? (sudahHitung ? BUTTON_LABELS.LOADING_SUBMIT : BUTTON_LABELS.LOADING_HITUNG)
                                            : (sudahHitung ? BUTTON_LABELS.SUBMIT : BUTTON_LABELS.HITUNG)}
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
