import styled from "@emotion/styled";
import { Select, TextField } from "@mui/material";

export const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#7b61ff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#7b61ff",
  },
  "& .MuiOutlinedInput-root": {
    font: "Satoshi, sans-serif",
    fontSize: "14px",
    "& fieldset": {
      borderRadius: "50px",
    },
    "&:hover fieldset": {
      borderColor: "#7b61ff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7b61ff",
    },
  },
  "& .MuiButtonBase-root": {
    marginRight: "0px",
  },
});
export const CustomSelect = styled(TextField)({
  "& label.Mui-focused": {
    color: "#7b61ff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#7b61ff",
  },
  "& .MuiOutlinedInput-root": {
    font: "Satoshi, sans-serif",
    fontSize: "14px",
    "& fieldset": {
      borderRadius: "50px",
    },
    "&:hover fieldset": {
      borderColor: "#7b61ff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7b61ff",
    },
  },
  "& .MuiButtonBase-root": {
    marginRight: "0px",
  },
});
