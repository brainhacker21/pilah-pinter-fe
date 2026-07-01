import { createTheme } from '@mui/material/styles'
import {
  BG_DEFAULT,
  BG_PAPER, BORDER_COLOR, BORDER_HOVER,
  BRAND_COLOR,
  BRAND_CONTRAST,
  BRAND_DARK,
  BRAND_LIGHT,
  SECONDARY_COLOR, TEXT_DARK, TEXT_SECONDARY
} from "./utils/constants.js";

const theme = createTheme({
  palette: {
    primary: {
      main: BRAND_COLOR,
      light: BRAND_LIGHT,
      dark: BRAND_DARK,
      contrastText: BRAND_CONTRAST,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
    background: {
      default: BG_DEFAULT,
      paper: BG_PAPER,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 10,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
      },
      styleOverrides: {
        root: {
          '& .MuiFilledInput-root': {
            backgroundColor: BORDER_COLOR,
            borderRadius: 8,
            '&:before': {
              borderBottom: 'none',
            },
            '&:after': {
              borderBottom: 'none',
            },
            '&:hover': {
              backgroundColor: BORDER_HOVER,
            },
            '&.Mui-focused': {
              backgroundColor: BORDER_HOVER,
            },
          },
        },
      },
    },
    MuiFilledInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: TEXT_DARK,
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            fontWeight: 700,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: TEXT_SECONDARY,
          },
        },
      },
    },
  },
})

export default theme
