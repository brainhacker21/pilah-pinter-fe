import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Card, Button, Typography, Avatar, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
} from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { DUMMY_DATA } from '../utils/dummy'
import { BRAND_COLOR, ROUTES, ROWS_PER_PAGE, TABLE_COLUMNS } from '../utils/constants.js'

export default function HomePage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(0)

  const isEmpty = DUMMY_DATA.length === 0 // TODO: implementasi api backend untuk list sampah
  const start = page * ROWS_PER_PAGE
  const paginatedData = DUMMY_DATA.slice(start, start + ROWS_PER_PAGE)

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
            onClick={() => navigate(ROUTES.TAMBAH)}
            className="w-full sm:w-auto"
            data-testid="button-ambil"
          >
            Ambil
          </Button>
        </Card>

        {/* Tabel / Empty state */}
        <Card>
          {isEmpty ? (
            <Box className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 text-center">
              <Avatar className="w-[72px] h-[72px] mb-4" style={{ backgroundColor: BRAND_COLOR }}>
                <FileUploadIcon className="text-white text-4xl" />
              </Avatar>
              <Typography variant="h6" className="font-bold mb-1">
                Daftar sampah anda kosong
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Silahkan anda tambahkan sampah
              </Typography>
            </Box>
          ) : (
            <>
              {/* Desktop: table */}
              <TableContainer className="hidden md:block">
                <Table>
                  <TableHead>
                    <TableRow>
                      {TABLE_COLUMNS.map((col) => (
                        <TableCell key={col}>{col}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedData.map((row) => (
                      <TableRow key={row.id} hover data-testid={`row-sampah-${row.id}`}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.judul}</TableCell>
                        <TableCell>{row.jenisSampah}</TableCell>
                        <TableCell>{row.tanggal}</TableCell>
                        <TableCell>
                          <Typography color="primary" variant="body2" className="font-medium">
                            + {row.koin.toLocaleString('id-ID')} Koin
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Mobile: stacked cards */}
              <Box className="md:hidden">
                {paginatedData.map((row, idx) => (
                  <Box key={row.id} data-testid={`row-sampah-${row.id}`}>
                    <Box className="p-4 flex flex-col gap-1.5">
                      <Box className="flex items-start justify-between gap-3">
                        <Typography variant="body1" className="font-semibold leading-tight">
                          {row.judul}
                        </Typography>
                        <Typography color="primary" variant="body2" className="font-semibold whitespace-nowrap">
                          + {row.koin.toLocaleString('id-ID')} Koin
                        </Typography>
                      </Box>
                      <Box className="flex items-center gap-2 flex-wrap">
                        <Box
                          component="span"
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                          sx={{ backgroundColor: '#e8f5e9', color: BRAND_COLOR }}
                        >
                          {row.jenisSampah}
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          #{row.id}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {row.tanggal}
                      </Typography>
                    </Box>
                    {idx < paginatedData.length - 1 && <Divider />}
                  </Box>
                ))}
              </Box>

              <TablePagination
                component="div"
                count={DUMMY_DATA.length}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={ROWS_PER_PAGE}
                rowsPerPageOptions={[ROWS_PER_PAGE]}
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
              />
            </>
          )}
        </Card>
      </Box>
    </Box>
  )
}
