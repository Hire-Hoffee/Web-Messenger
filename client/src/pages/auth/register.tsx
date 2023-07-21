import React from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { QuestionAnswer } from "@mui/icons-material";

const CustomBox = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const CustomButton = styled(Button)(({ theme }) => ({
  height: "50px",
  padding: "0px 30px 0px 30px",
  backgroundColor: theme.palette.primary.dark,
  borderRadius: "10px",
  transition: "0.2s",
  marginTop: "5px",
  marginBottom: "5px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    opacity: "0.8",
    transition: "0.2s",
  },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  marginTop: "5px",
  fontSize: "48px",
  marginBottom: "5px",
  "& label": {
    color: "grey",
  },
  "& label.Mui-focused": {
    color: theme.palette.primary.dark,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.primary.dark,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.primary.dark,
      borderWidth: 2,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.dark,
      borderWidth: 3,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.dark,
    },
  },
}));

type Props = {};

export default function Login({}: Props) {
  return (
    <CustomBox>
      <Paper
        sx={{
          width: "700px",
          height: "initial",
          "&:hover": { bgcolor: "primary.light" },
          padding: "50px",
        }}
      >
        <Box
          sx={{
            marginBottom: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <QuestionAnswer sx={{ fontSize: "90px", color: "primary.dark", margin: "20px" }} />
          <Typography
            variant="h5"
            sx={{ textAlign: "center", color: "primary.dark", textTransform: "uppercase" }}
          >
            Register new account
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", marginBottom: "50px" }}>
          <CustomTextField label="Email" variant="outlined" />
          <CustomTextField label="Username" variant="outlined" />
          <CustomTextField label="Password" variant="outlined" />
          <CustomTextField label="Avatar URL" variant="outlined" />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CustomButton>Register</CustomButton>
          <CustomButton
            sx={{
              bgcolor: "primary.main",
              color: "primary.dark",
              "&:hover": { color: "primary.main" },
            }}
          >
            Login
          </CustomButton>
        </Box>
      </Paper>
    </CustomBox>
  );
}
