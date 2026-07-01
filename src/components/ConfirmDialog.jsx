import {
  Dialog, DialogContent, DialogActions, Button, Typography, Box,
} from '@mui/material'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'

/**
 * Reusable confirmation dialog matching the Figma "Konfirmasi" design:
 * warning triangle icon, centered title & body, Batal (cancel) + Kirim (confirm).
 * Fully responsive — becomes near full-width on mobile.
 */
export default function ConfirmDialog({
  open,
  title = 'Konfirmasi',
  body = '',
  confirmLabel = 'Kirim',
  cancelLabel = 'Batal',
  confirmColor = 'primary',
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onCancel}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            m: 2,
            width: 'calc(100% - 32px)',
          },
        },
      }}
      data-testid="confirm-dialog"
    >
      <DialogContent sx={{ px: { xs: 3, sm: 4 }, pt: 4, pb: 2 }}>
        <Box className="flex flex-col items-center text-center">
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,160,0,0.12)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1.5,
            }}
          >
            <WarningRoundedIcon sx={{ fontSize: 36, color: '#ffa000' }} />
          </Box>
          <Typography variant="h6" className="font-bold mb-2">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {body}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{ px: { xs: 3, sm: 4 }, pb: 3, pt: 0, gap: 1.5 }}
        className="flex"
      >
        <Button
          onClick={onCancel}
          color="inherit"
          disabled={loading}
          sx={{ color: 'text.secondary', flex: { xs: 1, sm: 'unset' } }}
          data-testid="dialog-cancel"
        >
          {cancelLabel}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={confirmColor}
          disabled={loading}
          disableElevation
          sx={{ flex: { xs: 1, sm: 'unset' }, minWidth: 96 }}
          data-testid="dialog-confirm"
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
