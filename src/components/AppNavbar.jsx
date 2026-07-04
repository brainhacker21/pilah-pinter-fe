import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import PropTypes from 'prop-types'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import { getTransaksiByUser } from '../services/transaksiService'

export default function AppNavbar({ onLogout }) {
  const { user } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null)
  const [totalKoin, setTotalKoin] = useState(0)
  const menuOpen = Boolean(anchorEl)

  useEffect(() => {
    if (!user?.id) return
    getTransaksiByUser(user.id)
      .then((res) => {
        const list = res.data.data || [];
        setTotalKoin(list.reduce((acc, t) => acc + t.nominal, 0));
      })
      .catch((error) => {
        console.error("Gagal fetch transaksi:", error);
        setTotalKoin(0); //Reset ke 0 jika fetch gagal
      });
  }, [user?.id])

  const handleLogout = () => {
    setAnchorEl(null)
    onLogout?.()
  }

  const coinChip = (
    <Typography variant="body2" className="text-black/60 font-medium whitespace-nowrap">
      <span className="text-[#ca8a04]">●</span>{' '}
      {totalKoin.toLocaleString('id-ID')} Koin
    </Typography>
  )

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar className="flex justify-between gap-2">
        <Box className="flex items-center gap-2 min-w-0">
          <Logo width={130} />
        </Box>
        {/* Desktop: coin + username + logout button */}
        <Box className="hidden sm:flex items-center gap-6">
          {coinChip}
          <Typography variant="body2" className="text-black/60 cursor-pointer">
            {user?.nama || "User"}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={onLogout}
            data-testid="button-keluar"
          >
            Keluar
          </Button>
        </Box>

        <Box className="flex sm:hidden items-center gap-2">
          {coinChip}
          <IconButton
            edge="end"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            aria-label="Menu"
            data-testid="button-menu-mobile"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem disabled>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              {user?.nama || "User"}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} data-testid="button-keluar-mobile">
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="primary" />
              </ListItemIcon>
              Keluar
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

AppNavbar.propTypes = {
  onLogout: PropTypes.func,
}
