import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Paper,
  useTheme,
  Avatar,
} from "@mui/material";
import { Shield, Key, CheckCircle } from "@mui/icons-material";

const Landing = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleStartWritingClick = () => {
    navigate("/register");
  };

  const features = [
    {
      icon: <Shield fontSize="large" sx={{ color: theme.palette.primary.main }} />,
      title: "End-to-End Encryption",
      description: "Your notes are encrypted before they leave your device.",
    },
    {
      icon: <Key fontSize="large" sx={{ color: theme.palette.primary.main }} />,
      title: "Zero-Knowledge",
      description: "We can't read your notes, even if we wanted to.",
    },
    {
      icon: (
        <CheckCircle fontSize="large" sx={{ color: theme.palette.primary.main }} />
      ),
      title: "Always Available",
      description: "Access your notes anytime, anywhere, on any device.",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.grey[100],
        padding: "2rem 0",
      }}
    >
      {/* Hero Section */}
      <Container maxWidth="md" sx={{ textAlign: "center", marginBottom: "3rem" }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "1rem",
          }}
        >
          Your Thoughts, Secured
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            marginBottom: "2rem",
          }}
        >
          Write freely knowing your notes are protected with military-grade
          encryption.
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={handleStartWritingClick}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "30px",
          }}
        >
          Start Writing Now
        </Button>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "2rem",
                  borderRadius: "16px",
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: theme.shadows[4],
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: theme.palette.grey[200],
                    width: "64px",
                    height: "64px",
                    marginBottom: "1rem",
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    marginBottom: "1rem",
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Landing;
