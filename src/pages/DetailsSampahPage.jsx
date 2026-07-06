import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box, Card, Button, Typography, Avatar, Alert,
} from '@mui/material'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { getTransaksiById, getTransaksiGambar } from '../services/transaksiService'
import { BRAND_COLOR, ROUTES } from '../utils/constants.js'
import formatDate from '../utils/formatDate.js'

export default function DetailsSampahPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [detail, setDetail] = useState(null)
  const [gambarUrl, setGambarUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')

    getTransaksiById(id)
      .then((res) => setDetail(res.data.data))
      .catch(() => setError('Gagal memuat detail transaksi.'))
      .finally(() => setLoading(false))

    getTransaksiGambar(id)
      .then((res) => setGambarUrl(URL.createObjectURL(res.data)))
      .catch(() => setGambarUrl(null))
  }, [id])

  // Bebaskan object URL gambar saat berganti atau saat unmount.
  useEffect(() => {
    if (!gambarUrl) return
    return () => URL.revokeObjectURL(gambarUrl)
  }, [gambarUrl])

  return (
    <Box className="min-h-screen bg-[#c8e6c9]">
      <Box className="p-4 sm:p-6 max-w-[960px] mx-auto">
        <Card className="mb-4 sm:mb-5 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <Avatar className="bg-[#e8f5e9] w-11 h-11">
            <ReceiptLongIcon style={{ color: BRAND_COLOR }} />
          </Avatar>
          <Box className="flex-1">
            <Typography variant="body1" className="font-semibold">
              Detail transaksi sampah
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Rincian sampah yang telah kamu setor
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(ROUTES.HOME)}
            className="w-full sm:w-auto"
            data-testid="button-kembali"
          >
            Kembali
          </Button>
        </Card>

        <Card>
          {loading ? (
            <Box className="flex items-center justify-center py-16">
              <Typography variant="body2" color="text.secondary">Memuat data...</Typography>
            </Box>
          ) : error || !detail ? (
            <Box className="p-4 sm:p-6">
              <Alert severity="error">{error || 'Data tidak ditemukan.'}</Alert>
            </Box>
          ) : (
            <Box className="p-4 sm:p-6 flex flex-col md:flex-row gap-5 md:gap-6">
              <Box className="flex-1 flex flex-col md:justify-center">
                <Box className="border-2 border-dashed border-[#c8e6c9] rounded-2xl bg-[#e8f5e9] h-[200px] sm:h-[260px] flex flex-col items-center justify-center relative overflow-hidden">
                  {gambarUrl ? (
                    <img src={gambarUrl} alt="Gambar sampah" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <AddPhotoAlternateIcon className="text-[48px] sm:text-[56px] text-[#388e3c] mb-3" />
                      <Typography variant="body2" color="text.secondary" className="text-center px-4">
                        Gambar tidak tersedia
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>

              <Box className="w-full md:w-[280px] flex flex-col">
                <Typography variant="subtitle1" className="font-bold mb-4">
                  Details
                </Typography>
                <Box className="rounded-xl bg-[#e8f5e9] p-3 flex flex-col gap-1" data-testid="detail-transaksi">
                  <Box className="flex justify-between">
                    <Typography variant="body2" color="text.secondary">Kategori</Typography>
                    <Typography variant="body2" className="font-semibold capitalize">{detail.kategori}</Typography>
                  </Box>
                  <Box className="flex justify-between">
                    <Typography variant="body2" color="text.secondary">Berat</Typography>
                    <Typography variant="body2" className="font-semibold">{detail.beratKg} Kg</Typography>
                  </Box>
                  <Box className="flex justify-between">
                    <Typography variant="body2" color="text.secondary">Harga / Kg</Typography>
                    <Typography variant="body2" className="font-semibold">{detail.hargaPerKg.toLocaleString('id-ID')} Koin</Typography>
                  </Box>
                  <Box className="flex justify-between">
                    <Typography variant="body2" color="text.secondary">Tanggal</Typography>
                    <Typography variant="body2" className="font-semibold">{formatDate(detail.createdAt)}</Typography>
                  </Box>
                  <Box className="flex justify-between">
                    <Typography variant="body2" color="text.secondary">Pendapatan koin</Typography>
                    <Typography variant="body2" className="font-bold" style={{ color: BRAND_COLOR }}>{detail.nominal.toLocaleString('id-ID')} Koin</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Card>
      </Box>
    </Box>
  )
}
