import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherDetails,
  fetchWeatherDetailsNext5,
} from "../features/WeatherThunk";
import WeatherData from "./WeatherData";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Link,
  Fade,
  InputAdornment,
  Paper,
  Tooltip,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  FormControlLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LinkIcon from "@mui/icons-material/Link";
import LanguageIcon from "@mui/icons-material/Language";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { setTheme } from "../features/WeatherSlice";
import { showSnackbar } from "../features/snackbarSlice";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#003892",
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
}));

const WeatherMain = () => {
  const dispatch = useDispatch();
  const inputValue = useRef();
  const [cityName, setCityName] = useState("Khordha");
  const [lang, setLang] = useState(true);
  const [error, setError] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const apiKey = process.env.REACT_APP_API_KEY;

  const windData = useSelector(
    (state) => state.weather.data.weather?.windData || {}
  );
  const myData = useSelector(
    (state) => state.weather.data.weather?.mainData || {}
  );
  const dataWeather = useSelector(
    (state) => state.weather.data.weather?.weatherData || {}
  );
  const cityDetails = useSelector(
    (state) => state.weather.data.weather?.cityDetails || {}
  );
  const loadingState = useSelector(
    (state) => state.weather.loading.weather || false
  );
  const errorState = useSelector(
    (state) =>
      state?.weather?.error?.weather?.message ||
      state?.weather?.error?.weather ||
      false
  );
  const next = useSelector((state) => state.weather.data.next || []);
  const darkmode = useSelector((state) => state.weather?.theme || false);

  useEffect(() => {
    dispatch(
      fetchWeatherDetails({
        optionEndpoint: `forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=${
          lang ? "en" : "hi"
        }`,
      })
    );
    dispatch(
      fetchWeatherDetailsNext5({
        optionEndpoint: `forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=${
          lang ? "en" : "hi"
        }`,
      })
    );
  }, [cityName, lang, dispatch, apiKey]);

  useEffect(() => {
    setError(!errorState);
    if (errorState) {
      dispatch(
        showSnackbar({
          message: "Error fetching weather data",
          severity: "error",
        })
      );
    } else {
      loadingState &&
        dispatch(
          showSnackbar({
            message: "Data fetched Successfully",
            severity: "success",
          })
        );
    }
  }, [dispatch, errorState, loadingState]);

  const handleSearch = (e, val) => {
    e?.preventDefault();
    const value = val || inputValue.current?.value?.trim();
    if (value) {
      setCityName(value);
      setRecentSearches((prev) => {
        const updated = [value, ...prev.filter((item) => item !== value)].slice(
          0,
          5
        );
        return updated;
      });
      setShowSuggestions(false);
    }
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") handleSearch(e);
  };

  const handleGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const endpoint = `forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=${
          lang ? "en" : "hi"
        }`;
        dispatch(fetchWeatherDetails({ optionEndpoint: endpoint }));
        dispatch(fetchWeatherDetailsNext5({ optionEndpoint: endpoint }));
      });
    }
  };

  const getDailyForecast = (forecastData) => {
    const dailyData = [];
    const seenDates = new Set();

    forecastData.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      if (!seenDates.has(date) && entry.dt_txt.includes("12:00:00")) {
        seenDates.add(date);
        dailyData.push({ ...entry, date });
      }
    });

    return dailyData.slice(0, 5);
  };

  const dailyForecast = getDailyForecast(next);

  return (
    <Box sx={{ 
      height:'100vh',
      width: "100vw",
      boxSizing: "border-box",
      overflowX:'hidden',
        background: (theme) =>
      theme.palette.mode === "light"
        ? "linear-gradient(135deg, rgb(234, 236, 238) 0%, rgb(233, 238, 243) 100%)"
        : "linear-gradient(135deg, #1e1e2f 0%, #2c2c3a 100%)",}}>

    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        boxSizing: "border-box",
        py: { xs: 2, md: 4 },
        px:0,
      }}
    >
      
      <Fade in={true} timeout={700}>
        <Paper
          elevation={6}
          sx={{
            width: { xs: "100%", sm: "85%", md: "87%" },
            maxWidth: 1280,
            mx: "auto",
            p: { xs: 2, sm: 3 },
            borderRadius: 0,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            // overflow: "hidden",
          }}
        >
          {/* Header */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "primary.main",
                fontSize: { xs: "1.5rem", sm: "2rem" },
              }}
            >
              Weather Dashboard
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              alignItems={{ xs: "stretch", sm: "center" }}
            >
              <Box
                component="form"
                onSubmit={handleSearch}
                sx={{ position: "relative", width: { xs: "100%", sm: "auto" } }}
              >
                <TextField
                  inputRef={inputValue}
                  placeholder={
                    lang ? "Enter city name" : "शहर का नाम दर्ज करें"
                  }
                  onKeyDown={onKeyDownHandler}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  size="small"
                  variant="outlined"
                  sx={{
                    width: { xs: "100%", sm: 250 },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type="submit" color="primary">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {showSuggestions && recentSearches.length > 0 && (
                  <Paper
                    elevation={2}
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      zIndex: 10,
                      width: "100%",
                      mt: 1,
                      p: 1,
                      borderRadius: 2,
                    }}
                  >
                    <Stack spacing={1}>
                      {recentSearches.map((city, idx) => (
                        <Chip
                          key={idx}
                          label={city}
                          onClick={() => handleSearch(null, city)}
                          sx={{ width: "100%" }}
                        />
                      ))}
                    </Stack>
                  </Paper>
                )}
              </Box>

              <Stack direction="row" spacing={1}>
                <Tooltip
                  title={lang ? "Use my location" : "मेरी लोकेशन का उपयोग करें"}
                >
                  <IconButton onClick={handleGeoLocation} color="primary">
                    <MyLocationIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title={lang ? "Switch to Hindi" : "Switch to English"}>
                  <IconButton
                    onClick={() => {
                      setLang(!lang);
                      dispatch(
                        showSnackbar({
                          message: "Language Changed Successfully",
                          severity: "info",
                        })
                      );
                    }}
                    color="primary"
                  >
                    <LanguageIcon />
                  </IconButton>
                </Tooltip>

                <FormControlLabel
                  control={
                    <MaterialUISwitch
                      checked={darkmode}
                      onChange={() => {
                        dispatch(setTheme());
                        dispatch(
                          showSnackbar({
                            message: darkmode
                              ? "Light Mode Activated"
                              : "Dark Mode Activated",
                            severity: "info",
                          })
                        );
                      }}
                    />
                  }
                />
              </Stack>
            </Stack>
          </Stack>

          {/* City Display */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            {error ? (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  {cityDetails.name}, {cityDetails.country}
                </Typography>
                <Tooltip title={`View ${cityDetails.name} on Wikipedia`}>
                  <Link
                    href={`https://en.wikipedia.org/wiki/${cityDetails.name}`}
                    target="_blank"
                    rel="noopener"
                    sx={{ color: "primary.main" }}
                  >
                    <LinkIcon fontSize="small" />
                  </Link>
                </Tooltip>
              </Stack>
            ) : (
              <Typography
                variant="subtitle1"
                color="error.main"
                fontWeight={600}
                sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
              >
                {lang ? "Invalid City Name" : "अमान्य शहर का नाम"}
              </Typography>
            )}
          </Box>

          {/* Main Content */}
          <Grid container spacing={2}>
  {/* Section 1: Current Weather */}
  <Grid item xs={12} md={6}>
    <Typography variant="h5" sx={{ mb: 2 }}>
      {lang ? "Current Weather" : "वर्तमान मौसम"}
    </Typography>
    <WeatherData
      weatherData={myData}
      weather={dataWeather}
      city={cityDetails}
      lang={lang}
      windData={windData}
    />
  </Grid>

  {/* Section 2: 5-Day Forecast */}
  <Grid item xs={12} md={6}>
    <Typography variant="h5" sx={{ mb: 2 }}>
      {lang ? "5-Day Forecast" : "5-दिन का पूर्वानुमान"}
    </Typography>

    {dailyForecast.length > 0 ? (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "row",lg:'column',xl:'coulmn' },
          overflowX: { xs: "auto", md: "hidden" },
          overflowY: { xs: "hidden", md: "auto" },
          gap: 2,
          pr: 1,
          maxHeight: { md: "57vh" },
        }}
      >
        {dailyForecast.map((day, index) => (
          <Card key={index} sx={{ minWidth: 220, flexShrink: 0 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {day.date}
              </Typography>
              <Typography variant="body2">
                {lang ? "Temp" : "तापमान"}: {day.main.temp}°C
              </Typography>
              <Typography variant="body2">
                {day.weather[0].description}
              </Typography>
              <Typography variant="body2">
                {lang ? "Wind" : "हवा"}: {day.wind.speed} m/s
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    ) : (
      <Typography variant="body2" color="text.secondary">
        {lang
          ? "No forecast data available"
          : "कोई पूर्वानुमान डेटा उपलब्ध नहीं"}
      </Typography>
    )}
  </Grid>
</Grid>

        </Paper>
      </Fade>
    </Box>
    </Box>
  );
};

export default WeatherMain;
