import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
} from "@mui/material";
import { NoteAlt, ArrowDropDown } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#1976d2", // Blue as the accent color
    },
  },
});

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogoutClick = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTitleClick = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{
          background: "radial-gradient(circle, #0b192f, #172a45)",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "0.5rem 1rem",
          borderBottom: `2px solid ${theme.palette.secondary.main}`,
        }}
      >
        <Toolbar>
          <Box
            onClick={handleTitleClick}
            sx={{
              flexGrow: 1,
              cursor: "pointer",
            }}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                background: "linear-gradient(to right, #1976d2, #42a5f5, #bbdefb)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              CryptoNotes
            </Typography>
          </Box>

          {isLoggedIn ? (
            <Box display="flex" alignItems="center">
              <Avatar
                sx={{
                  bgcolor: "#1976d2",
                  marginRight: "0.5rem",
                  cursor: "pointer",
                }}
                onClick={handleMenuClick}
              >
                U
              </Avatar>
              <IconButton color="inherit" onClick={handleMenuClick}>
                <ArrowDropDown sx={{ color: theme.palette.secondary.main }} />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 4,
                  style: {
                    marginTop: "0.5rem",
                    borderRadius: "8px",
                    minWidth: "160px",
                    border: `1px solid ${theme.palette.secondary.main}`,
                  },
                }}
              >
                <MenuItem onClick={() => navigate("/profile")}>My Profile</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box display="flex" gap="1rem">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/login")}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.main,
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                  },
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/register")}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#ffffff",
                }}
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
