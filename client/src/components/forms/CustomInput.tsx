import React from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { UserData } from "@/types/dbData";

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

type Props = {
  handler: Function;
  label: string;
  formData: keyof UserData;
  value: string | undefined;
};

export default function CustomInput({ handler, label, formData, value }: Props) {
  return (
    <CustomTextField
      label={label}
      variant="outlined"
      onChange={(e) => handler(e, formData)}
      value={value}
    />
  );
}
