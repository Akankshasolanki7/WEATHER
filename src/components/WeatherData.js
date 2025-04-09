"use client"

import { Box, Typography, IconButton, useTheme, Paper, Divider, useMediaQuery } from "@mui/material"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"

const WeatherData = ({ weatherData, weather, city, lang, windData }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const getTime = (timeStamp) => {
    return new Date(timeStamp * 1000).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const sideScroll = (dir) => {
    const slider = document.getElementById("scrolledItem")
    if (slider) slider.scrollLeft += dir === "right" ? 300 : -300
  }

  return (
    <Paper
      elevation={6}
      sx={{
        mt: 1,
        px: 4,
        pt: 2,
        borderRadius: '0 0 0 2px',
        background: `linear-gradient(145deg, ${theme.palette.primary.dark}AA, ${theme.palette.background.paper})`,
        backdropFilter: "blur(10px)",
        position: "relative",
        color: theme.palette.text.primary,
      }}
    >
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        mb={1}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <img
            src={`assets/${weather?.icon}.svg`}
            alt="weather icon"
            width={isMobile ? 80 : 100}
            style={{ filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.2))" }}
          />
          <Box>
            <Typography variant="h2" fontWeight={800}>
              {Math.round(weatherData?.temp)}°C
            </Typography>
            <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
              {weather?.description}
            </Typography>
          </Box>
        </Box>

        <Box textAlign="right">
          <Typography>
            {lang ? "Wind:" : "हवा:"} <strong style={{ color: theme.palette.success.main }}>{windData?.speed} mph</strong>
          </Typography>
          <Typography>
            {lang ? "Min Temp:" : "न्यूनतम ताप:"} <strong style={{ color: theme.palette.success.main }}>{Math.round(weatherData?.temp_min)}°C</strong>
          </Typography>
          <Typography>
            {lang ? "Max Temp:" : "अधिकतम ताप:"} <strong style={{ color: theme.palette.success.main }}>{Math.round(weatherData?.temp_max)}°C</strong>
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3, opacity: 0.3 }} />

      <Box position="relative" sx={{ overflow: "hidden" }}>
        <Box
          id="scrolledItem"
          display="flex"
          gap={3}
          overflow="auto"
          px={1}
          py={2}
          sx={{
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": { height: "6px" },
            "&::-webkit-scrollbar-thumb": {
              background: theme.palette.primary.main,
              borderRadius: 10,
            },
          }}
        >
          {["sunrise", "humidity", "wind", "pressure", "sunset"].map((key, idx) => {
            const info = {
              sunrise: {
                label: lang ? "SUNRISE" : "सूर्योदय",
                icon: "sunrise",
                value: getTime(city?.sunrise),
              },
              humidity: {
                label: lang ? "HUMIDITY" : "नमी",
                icon: "humidity",
                value: `${weatherData?.humidity} mm`,
              },
              wind: {
                label: lang ? "WIND" : "हवा",
                icon: "wind",
                value: `${windData?.speed} mph`,
              },
              pressure: {
                label: lang ? "PRESSURE" : "दबाव",
                icon: "pressure-low",
                value: `${weatherData?.pressure} mb`,
              },
              sunset: {
                label: lang ? "SUNSET" : "सूर्यास्त",
                icon: "sunset",
                value: getTime(city?.sunset),
              },
            }[key]

            return (
              <Paper
                key={idx}
                elevation={4}
                sx={{
                  minWidth: 120,
                  textAlign: "center",
                  p: 1,
                  borderRadius: 1,
                  background: `${theme.palette.background.paper}80`,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <Typography fontWeight={600} color="primary.main" textAlign={"center"}>
                  {info.label}
                </Typography>
                <img
                  src={`https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/${info.icon}.svg`}
                  alt={info.icon}
                  width={50}
                  style={{ margin: "12px 0" }}
                />
                <Typography fontSize={14} fontWeight={500}>
                  {info.value}
                </Typography>
              </Paper>
            )
          })}
        </Box>
      </Box>
    </Paper>
  )
}

export default WeatherData