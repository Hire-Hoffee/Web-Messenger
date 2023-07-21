import React, { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { QuestionAnswer } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import { UserData } from "@/types/dbData";
import { CREATE_USER } from "@/graphql/mutations";
import CustomInput from "@/components/forms/CustomInput";

const CustomBox = styled(Box)(() => ({
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

type Props = {};

export default function Login({}: Props) {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
    username: "",
    avatar: "",
  });
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
  const router = useRouter();

  function handleInput(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof UserData
  ) {
    setUserData({ ...userData, [key]: event.target.value.trim() });
  }

  function createUserHandler(data: UserData) {
    createUser({ variables: { ...data } });
    setUserData({
      email: "",
      password: "",
      username: "",
      avatar: "",
    });
    router.push("/auth/login");
  }

  return (
    <CustomBox>
      <Paper
        sx={{
          width: "700px",
          height: "initial",
          "&:hover": { bgcolor: "primary.light", cursor: "unset" },
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
          <CustomInput
            label="Email"
            formData="email"
            handler={handleInput}
            value={userData.email}
          />
          <CustomInput
            label="Username"
            formData="username"
            handler={handleInput}
            value={userData.username}
          />
          <CustomInput
            label="Password"
            formData="password"
            handler={handleInput}
            value={userData.password}
          />
          <CustomInput
            label="Avatar"
            formData="avatar"
            handler={handleInput}
            value={userData.avatar}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CustomButton onClick={() => createUserHandler(userData)}>Register</CustomButton>
          <CustomButton
            onClick={() => router.push("/auth/login")}
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
