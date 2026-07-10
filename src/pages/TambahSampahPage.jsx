import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Button,
  TextField,
  Typography,
  Avatar,
  Alert,
  Snackbar,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ConfirmDialog from "../components/ConfirmDialog";
import { useAuth } from "../context/AuthContext";
import { klasifikasiSampah } from "../services/sampahService";
import { postSubmitTransaksi } from "../services/transaksiService";
import {
  ROUTES,
  BUTTON_LABELS,
  BRAND_COLOR,
  TEXT_CONTENT,
  DIALOG_CONTENT,
} from "../utils/constants.js";

export default function TambahSampahPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [berat, setBerat] = useState("");
  const [error, setError] = useState({
    berat: false,
    general: false,
  });
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [hasil, setHasil] = useState(null);

  // Berat harus valid (angka positif) sebelum upload gambar diizinkan.
  const beratValid =
    berat.trim() !== "" && !isNaN(Number(berat)) && Number(berat) > 0;

  // Setelah "Hitung" berhasil, tombol berubah menjadi "Submit".
  const sudahHitung = Boolean(hasil);

  // Gambar baru / berat berubah membatalkan hasil hitung sebelumnya.
  const resetHasil = () => {
    setHasil(null);
  };

  const readImage = (file) => {
    if (!beratValid) return;

    if (!file?.type.startsWith("image/")) {
      setError((prev) => ({
        ...prev,
        general: "File yang dipilih harus berupa gambar.",
      }));

      return;
    }

    setSelectedFile(file);
    resetHasil();

    const reader = new FileReader();

    reader.onload = (event) => {
      setPreview(event.target?.result);
    };

    reader.onerror = () => {
      setError((prev) => ({
        ...prev,
        general: "Gambar gagal dibaca.",
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    if (!beratValid) return;

    readImage(event.dataTransfer.files[0]);
  };

  const handleBeratChange = (event) => {
    setBerat(event.target.value);
    setError((prev) => ({ ...prev, berat: false }));
    resetHasil();
  };

  const handleBeratBlur = () => {
    const nilaiBerat = Number(berat);

    if (!berat.trim()) {
      setError((prev) => ({
        ...prev,
        berat: "Berat wajib diisi.",
      }));

      return;
    }

    if (Number.isNaN(nilaiBerat) || nilaiBerat <= 0) {
      setError((prev) => ({
        ...prev,
        berat: "Berat harus berupa angka positif.",
      }));

      return;
    }

    setError((prev) => ({
      ...prev,
      berat: false,
    }));
  };

  const validate = () => {
    if (!berat.trim()) {
      setError((prev) => ({
        ...prev,
        berat: "Berat wajib diisi.",
      }));

      return false;
    }

    if (isNaN(Number(berat)) || Number(berat) <= 0) {
      setError((prev) => ({
        ...prev,
        berat: "Berat harus berupa angka positif.",
      }));

      return false;
    }

    if (!selectedFile) {
      setError((prev) => ({
        ...prev,
        general: "Silakan unggah gambar terlebih dahulu.",
      }));

      return false;
    }

    return true;
  };

  // Langkah "Hitung": panggil API klasifikasi lalu tampilkan hasilnya.
  const handleHitung = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const { data } = await klasifikasiSampah(selectedFile, berat, user?.id);

      setHasil(data.data);
    } catch (err) {
      setError((prev) => ({
        ...prev,
        general:
          err.response?.data?.message || "Gagal mengklasifikasikan sampah.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (sudahHitung) {
      setConfirmOpen(true);
    } else {
      handleHitung();
    }
  };

  const handleConfirm = async () => {
    if (!hasil?.transaksiId) {
      setConfirmOpen(false);

      setError((prev) => ({
        ...prev,
        general: "ID transaksi tidak ditemukan.",
      }));

      return;
    }

    setLoading(true);

    try {
      await postSubmitTransaksi(hasil.transaksiId);

      setConfirmOpen(false);
      navigate(ROUTES.HOME);
    } catch (err) {
      setError((prev) => ({
        ...prev,
        general: err.response?.data?.message || "Gagal mengirim transaksi.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleCancelConfirm = () => {
    if (loading) {
      return;
    }

    setConfirmOpen(false);
  };

  const handleCloseError = () => {
    setError((prev) => ({
      ...prev,
      general: false,
    }));
  };

  const buttonLabel = loading
    ? sudahHitung
      ? BUTTON_LABELS.LOADING_SUBMIT
      : BUTTON_LABELS.LOADING_HITUNG
    : sudahHitung
      ? BUTTON_LABELS.SUBMIT
      : BUTTON_LABELS.HITUNG;

  return (
    <Box className="min-h-screen bg-[#c8e6c9]">
      <Box className="mx-auto max-w-[960px] p-4 sm:p-6">
        <Card>
          <Box className="flex flex-col gap-5 p-4 sm:p-6 md:flex-row md:gap-6">
            <Box className="flex flex-1 flex-col md:justify-center">
              <Box
                component="label"
                onDragOver={(event) => event.preventDefault()}
                onDrop={handleDrop}
                className={`relative flex h-[200px] flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed bg-[#e8f5e9] transition-colors duration-200 sm:h-[260px] ${
                  beratValid && !loading
                    ? "cursor-pointer border-[#c8e6c9] hover:border-[#388e3c]"
                    : "cursor-not-allowed border-[#c8e6c9] opacity-60"
                }`}
                aria-disabled={!beratValid || loading}
                data-testid="upload-area"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={!beratValid || loading}
                  onChange={(event) => {
                    const file = event.target.files?.[0];

                    readImage(file);

                    event.target.value = "";
                  }}
                  data-testid="input-file"
                />

                {preview ? (
                  <img
                    src={preview}
                    alt="Pratinjau sampah"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <AddPhotoAlternateIcon className="mb-3 text-[48px] text-[#388e3c] sm:text-[56px]" />

                    {beratValid ? (
                      <>
                        <Typography
                          variant="body1"
                          className="px-4 text-center font-semibold"
                        >
                          Ambil foto langsung
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          className="mt-1 px-4 text-center"
                        >
                          atau{" "}
                          <span className="cursor-pointer font-semibold text-[#388e3c]">
                            tambahkan file gambar Anda
                          </span>
                        </Typography>
                      </>
                    ) : (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="mt-1 px-4 text-center"
                      >
                        Isi berat terlebih dahulu untuk mengunggah gambar
                      </Typography>
                    )}
                  </>
                )}
              </Box>

              {preview && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  className="mt-2 block text-center"
                >
                  Klik gambar untuk menggantinya
                </Typography>
              )}
            </Box>

            <Box className="flex w-full flex-col md:w-[280px]">
              <Typography variant="subtitle1" className="mb-4 font-bold">
                Form
              </Typography>

              <form
                onSubmit={handleSubmit}
                className="flex flex-1 flex-col gap-3"
                noValidate
              >
                <TextField
                  name="berat"
                  label="Berat (Kg)"
                  type="number"
                  value={berat}
                  onChange={handleBeratChange}
                  onBlur={handleBeratBlur}
                  error={Boolean(error.berat)}
                  helperText={error.berat || false}
                  fullWidth
                  disabled={loading}
                  slotProps={{
                    htmlInput: {
                      "data-testid": "input-berat",
                      min: 0,
                      step: 0.1,
                    },
                  }}
                />

                {hasil && (
                  <Box
                    className="flex flex-col gap-1 rounded-xl bg-[#e8f5e9] p-3"
                    data-testid="hasil-hitung"
                  >
                    <Box className="flex justify-between gap-3">
                      <Typography variant="body2" color="text.secondary">
                        Kategori
                      </Typography>

                      <Typography
                        variant="body2"
                        className="text-right font-semibold capitalize"
                      >
                        {hasil.kategori || "-"}
                      </Typography>
                    </Box>

                    <Box className="flex justify-between gap-3">
                      <Typography variant="body2" color="text.secondary">
                        Harga / Kg
                      </Typography>

                      <Typography
                        variant="body2"
                        className="text-right font-semibold"
                      >
                        {Number(hasil.hargaPerKg || 0).toLocaleString("id-ID")}{" "}
                        Koin
                      </Typography>
                    </Box>

                    <Box className="flex justify-between gap-3">
                      <Typography variant="body2" color="text.secondary">
                        Total
                      </Typography>

                      <Typography
                        variant="body2"
                        className="text-right font-bold"
                        sx={{ color: BRAND_COLOR }}
                      >
                        {Number(hasil.nominal || 0).toLocaleString("id-ID")}{" "}
                        Koin
                      </Typography>
                    </Box>
                  </Box>
                )}

                <Box className="mt-4 md:mt-auto">
                  <Button
                    type="submit"
                    variant={sudahHitung ? "contained" : "outlined"}
                    color="primary"
                    fullWidth
                    disabled={loading}
                    data-testid="button-submit"
                  >
                    {buttonLabel}
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
        onCancel={handleCancelConfirm}
      />

      <Snackbar
        open={Boolean(error.general)}
        autoHideDuration={5000}
        onClose={handleCloseError}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={handleCloseError}
          sx={{ width: "100%" }}
        >
          {error.general}
        </Alert>
      </Snackbar>
    </Box>
  );
}
