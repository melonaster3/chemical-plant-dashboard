import logo from "./logo.svg";
import "./App.css";
import Graph from "./components/index";
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles';
function App() {

  // There for Material UI
  const theme = createTheme({
    palette: {
      primary: {
        main: '#b4586d', // Primary Color
        contrastText: '#FFFFFF', // Text on Primary Color
        light: '#F5F5F5', // Light Background
        dark: '#333333', // Dark Background
      },
      secondary: {
        main: '#F44336', // Secondary Color
        contrastText: '#FFFFFF', // Text on Secondary Color
        light: '#FAEAEA', // Light Background
        dark: '#7B1818', // Dark Background
      },
      tertiary: {
        main: '#4CAF50', // Tertiary Color
        contrastText: '#FFFFFF', // Text on Tertiary Color
        light: '#E6F7E1', // Light Background
        dark: '#2E7D32', // Dark Background
      },
    },
    // Assign Font types
    typography: {
      typography: {
        fontFamily: 'Roboto, sans-serif',
      },
    },

     // Assign Global Buttons
    components: {
       MuiButton: {
          styleOverrides: {
             root: {
                color: "white",
                fontFamily:  'Roboto, sans-serif',
                fontSize : "0.7rem",
                borderColor: "rgba(74, 124, 194)",
                backgroundColor: "#b4586d",
                ":hover" : {
                  backgroundColor: "#CA8A98",
                }
              },
          },
       },
      // Assign Global Buttons
       MuiButtonBase: {
          styleOverrides: {
             root: {
                ":disabled": {
                   color: "grey",
                },
             },
          },
       },
    },
 });  
 const appTheme = createTheme(theme); // Create the theme object

  const Logo = styled("img")`
 height : 10rem;
 width : 10rem;
`;

 return (
  <ThemeProvider theme={appTheme}>
    <div className="App">
      <header className="App-header">
              <Logo src={"/simacro.svg"}/> 

        <h1 style={{ color: appTheme.palette.primary.main }}>Chemical Dashboard</h1>
        <Graph />
      </header>
    </div>
  </ThemeProvider>
);
}

export default App;
