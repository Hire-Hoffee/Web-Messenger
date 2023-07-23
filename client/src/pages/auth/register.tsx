import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Paper, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { QuestionAnswer } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Joi from "joi";

import { UserData } from "@/types";
import { REGISTER_USER } from "@/graphql/mutations";

type Props = {};

export default function Login({}: Props) {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
    username: "",
    avatar: "https://shorturl.at/gwDEY",
  });
  const [isBtnDisabled, setDisabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [registerUser] = useMutation(REGISTER_USER);
  const router = useRouter();

  const dataValidator = (data: UserData) => {
    const validationSchema = Joi.object<UserData>({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      username: Joi.string().required(),
      password: Joi.string().min(8).max(32).required(),
      avatar: Joi.string().uri(),
    });

    const { error } = validationSchema.validate(data);
    return error ? setDisabled(true) : setDisabled(false);
  };

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof UserData
  ) => {
    setUserData({ ...userData, [key]: event.target.value.trim() });
  };

  const userRegistrationHandler = async (data: UserData) => {
    try {
      await registerUser({ variables: { ...data } });
    } catch (error: any) {
      setErrorMessage(error.networkError?.result.errors[0].message);
      return;
    }

    setUserData({
      email: "",
      password: "",
      username: "",
      avatar: "",
    });

    router.push("/auth/login");
  };

  useEffect(() => {
    dataValidator(userData);
  }, [userData]);

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
          <CustomTextField
            label="Email"
            value={userData.email}
            onChange={(event) => handleInput(event, "email")}
            type="email"
            required
            helperText="For example: example@someMail.com"
          />
          <CustomTextField
            label="Username"
            value={userData.username}
            onChange={(event) => handleInput(event, "username")}
            required
            helperText="For example: chatUser_4221"
          />
          <CustomTextField
            label="Password"
            value={userData.password}
            onChange={(event) => handleInput(event, "password")}
            type="password"
            required
            helperText="Length from 8 to 32 characters"
          />
          <CustomTextField
            label="Avatar URL"
            value={userData.avatar}
            onChange={(event) => handleInput(event, "avatar")}
            type="url"
            helperText="For example: 'https://coolPicture.com' or leave this field as default"
          />
        </Box>

        {errorMessage ? (
          <Typography variant="h6" color="error" marginBottom="20px">
            An error ocurred: "{errorMessage}"
          </Typography>
        ) : null}

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CustomButton
            sx={{ "&:disabled": { opacity: "0.7" } }}
            disabled={isBtnDisabled}
            onClick={() => userRegistrationHandler(userData)}
          >
            Register
          </CustomButton>
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
