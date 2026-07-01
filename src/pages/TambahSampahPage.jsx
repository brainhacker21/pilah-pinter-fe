import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box, Card, Button, TextField, Typography, Avatar, Alert,
} from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import ConfirmDialog from '../components/ConfirmDialog'
import {
    ROUTES, BUTTON_LABELS, BRAND_COLOR, TEXT_CONTENT, TIMEOUTS, DIALOG_CONTENT,
} from '../utils/constants.js'


export default function TambahSampahPage() {
    const navigate = useNavigate()
    const [preview, setPreview] = useState(null)
    const [form, setForm] = useState({ judul: '', berat: '', lokasi: '', catatan: '' })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [confirmOpen, setConfirmOpen] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    const readImage = (file) => {
        if (!file?.type.startsWith('image/')) return
        const reader = new FileReader()
        reader.onload = (ev) => setPreview(ev.target?.result)
        // TODO: implementasi api backend untuk upload gambar dan hasil AI untuk ketahui jenis sampah
        reader.readAsDataURL(file)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        readImage(e.dataTransfer.files[0])
    }

    const fields = [
        { name: 'judul', label: 'Judul' },
        { name: 'berat', label: 'Berat' },
        { name: 'lokasi', label: 'Lokasi' },
        { name: 'catatan', label: 'Catatan tambahan' },
    ]

    const validate = () => {
        const next = {}
        fields.forEach(({ name, label }) => {
            if (!form[name].trim()) next[name] = `${label} wajib diisi.`
        })
        setErrors(next)
        const tidakAdaError = Object.keys(next).length === 0
        return tidakAdaError
    }

    // Step 1: validate then open the confirmation dialog
    const handleSubmit = (e) => {
        // TODO: implementasi api backend untuk list sampah
        e.preventDefault()
        if (!validate()) return
        setConfirmOpen(true)
    }

    // Step 2: user confirmed — perform the "transaction"
    const handleConfirm = async () => {
        setLoading(true)
        try {
            await new Promise((r) => setTimeout(r, TIMEOUTS.SUBMIT_DELAY))
            setConfirmOpen(false)
            // TODO: implementasi api backend untuk submit sampah
            setSuccess(TEXT_CONTENT.SUCCESS_MESSAGE)
            setTimeout(() => navigate(ROUTES.HOME), TIMEOUTS.SUCCESS_DELAY)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box className="min-h-screen bg-[#c8e6c9]">
            <Box className="p-4 sm:p-6 max-w-[960px] mx-auto">
                {/* Banner */}
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

                {/* Upload + Form */}
                <Card>
                    <Box className="p-4 sm:p-6 flex flex-col md:flex-row gap-5 md:gap-6">
                        {/* Area upload */}
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

                        {/* Form */}
                        <Box className="w-full md:w-[280px] flex flex-col">
                            <Typography variant="subtitle1" className="font-bold mb-4">
                                Form
                            </Typography>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1" noValidate>
                                {fields.map(({ name, label }) => (
                                    <TextField
                                        key={name}
                                        name={name}
                                        label={label}
                                        value={form[name]}
                                        onChange={handleChange}
                                        error={Boolean(errors[name])}
                                        helperText={errors[name]}
                                        fullWidth
                                        slotProps={{ htmlInput: { 'data-testid': `input-${name}` } }}
                                    />
                                ))}

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

            {/* Confirmation dialog before saving the form (transaction) */}
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
