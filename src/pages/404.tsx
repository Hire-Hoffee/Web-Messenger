import React from "react";
import { Box, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import Link from "next/link";

type Props = {};

export default function Error({}: Props) {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ fontSize: "72px", color: "error.light" }}>
          Page not found (404)
        </Typography>
        <ErrorOutline sx={{ fontSize: "150px", color: "error.main", marginLeft: "30px" }} />
      </Box>
      <Link href="/" style={{ marginTop: "20px" }}>
        Return to the home page
      </Link>
    </Box>
  );
}
