import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./store/store";
import WeatherMain from "./components/WeatherMain";
import GlobalSnackbar from "./components/GlobalSnackbar.js";

const Config = () => {
  const darkmode = useSelector((state) => state.weather?.theme || false);
  return (
    <ThemeProvider theme={theme(darkmode)}>
      <WeatherMain />
      <GlobalSnackbar />
    </ThemeProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Config />
    </Provider>
  );
}

export default App;
