import React from 'react';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from '@tanstack/react-router';
import { useAuthStore } from '../../stores/loginStore';

export const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const isCompanyAdmin = user?.role === 'COMPANY_ADMIN';
  const isClient = user?.role === 'USER';
  const isSystemAdmin = user?.role === 'SYSTEM_ADMIN';

  return (
    <Box
      sx={{
        minWidth: 250,
        height: '100vh',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* System Name */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div" align="center">
          PRS
        </Typography>
      </Box>

      <Divider />

      {/* Main Navigation */}
      <List>
        <Link
          to="/"
          activeProps={{
            style: {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
            },
          }}
          style={{ textDecoration: 'none' }}
        >
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>

        {isClient && (
          <Link
            to="/my-reservations"
            activeProps={{
              style: {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
              },
            }}
            style={{ textDecoration: 'none' }}
          >
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="My Reservations" />
            </ListItem>
          </Link>
        )}
      </List>

      {isAuthenticated && isCompanyAdmin && (
        <>
          <Link to="/manage-companies" style={{ textDecoration: 'none' }}>
            <ListItem button>
              <ListItemIcon>
                <AdminPanelSettings />
              </ListItemIcon>
              <ListItemText primary="Manage Companies" />
            </ListItem>
          </Link>
          <Link to="/company-reservations" style={{ textDecoration: 'none' }}>
            <ListItem button>
              <ListItemIcon>
                <AdminPanelSettings />
              </ListItemIcon>
              <ListItemText primary="Company Reservations" />
            </ListItem>
          </Link>{' '}
        </>
      )}

      {isSystemAdmin && (
        <Link to="/company-approval" style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary="Company Approval" />
          </ListItem>
        </Link>
      )}

      <Divider sx={{ mt: 'auto' }} />

      <List>
        {!isAuthenticated ? (
          <>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <ListItem button>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Sign In" />
              </ListItem>
            </Link>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <ListItem button>
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItem>
            </Link>
          </>
        ) : (
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Off" />
          </ListItem>
        )}
      </List>
    </Box>
  );
};
