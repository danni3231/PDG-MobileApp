import {createTheme} from "@mui/material/styles";

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
    MuiOutlinedInput:{
      styleOverrides: {
        root: {
          borderRadius: "50px",
          fontSize: "14px",
          fontFamily: "Satoshi"
        },
      }
    }

   }
});