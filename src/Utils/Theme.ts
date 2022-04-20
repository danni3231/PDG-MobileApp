import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#7b61ff",
    },
    secondary: {
      main: "#7b61ff",
    },
  },

  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          width: "100%",
          borderRadius: "50px",
          fontSize: "14px",
          fontFamily: "Satoshi",
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        icon: {
          alignItems: "center",
          marginRight: "16px",
        },
        action: {
          alignItems: "center",
          padding: "0 0 0 16px",
        },
        message: {
          paddingRight: "30px",
          textAlign: "left",
        },
        filledSuccess: { backgroundColor: "#7b61ff" },
      },
    },
  },
});
