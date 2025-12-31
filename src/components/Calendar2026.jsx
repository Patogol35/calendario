import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function buildCalendar(year, month) {
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Domingo
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];

  // Rellenar con espacios vacíos hasta el primer día del mes
  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(null);
  }

  // Agregar los días del mes
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }

  return cells;
}

export default function Calendar2026() {
  const [month, setMonth] = useState(0);
  const year = 2026;
  const today = new Date();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const calendar = buildCalendar(year, month);

  // Obtener el nombre del día de la semana para el 1ro del mes
  const firstDayName = DAYS[new Date(year, month, 1).getDay()];
  const lastDay = new Date(year, month + 1, 0).getDate();
  const lastDayOfWeek = new Date(year, month, lastDay).getDay();

  return (
    <Box>
      {/* TÍTULO */}
      <Typography
        variant="h2"
        textAlign="center"
        fontWeight={800}
        mb={0.5}
        color="primary"
        sx={{ fontSize: { xs: "2rem", sm: "2.5rem" } }}
      >
        Calendario 2026
      </Typography>

      <Typography
        textAlign="center"
        color="text.secondary"
        mb={4}
        sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
      >
        Autor: Jorge Patricio Santamaría Cherrez
      </Typography>

      <Paper
        elevation={6}
        sx={{
          maxWidth: 900,
          mx: "auto",
          p: { xs: 2, sm: 4 },
          borderRadius: 4,
          backgroundColor: theme.palette.background.default,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* HEADER */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
          sx={{ gap: 1 }}
        >
          <IconButton
            onClick={() => setMonth((m) => (m === 0 ? 11 : m - 1))}
            size="large"
            sx={{
              bgcolor: theme.palette.action.hover,
              "&:hover": { bgcolor: theme.palette.action.selected },
            }}
          >
            <ChevronLeftIcon fontSize="medium" />
          </IconButton>

          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
            }}
          >
            {MONTHS[month]} {year}
          </Typography>

          <IconButton
            onClick={() => setMonth((m) => (m === 11 ? 0 : m + 1))}
            size="large"
            sx={{
              bgcolor: theme.palette.action.hover,
              "&:hover": { bgcolor: theme.palette.action.selected },
            }}
          >
            <ChevronRightIcon fontSize="medium" />
          </IconButton>
        </Box>

        {/* CABECERAS DE DÍAS */}
        <Grid container mb={2}>
          {DAYS.map((d) => (
            <Grid item xs={12 / 7} key={d}>
              <Typography
                align="center"
                fontWeight={700}
                color="text.secondary"
                sx={{
                  fontSize: { xs: "0.85rem", sm: "1rem" },
                  py: 1,
                  borderRadius: 1,
                  bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                }}
              >
                {d}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* CALENDARIO */}
        <Grid container spacing={0.5}>
          {calendar.map((day, index) => {
            const isToday =
              day &&
              today.getFullYear() === year &&
              today.getMonth() === month &&
              today.getDate() === day;

            const isWeekend = index % 7 === 0 || index % 7 === 6;

            return (
              <Grid item xs={12 / 7} key={index}>
                <Box
                  sx={{
                    height: { xs: 60, sm: 72 },
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: isToday
                      ? theme.palette.primary.main
                      : isWeekend
                        ? theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.04)"
                        : theme.palette.background.paper,
                    color: isToday
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                    border: isToday
                      ? `2px solid ${theme.palette.primary.dark}`
                      : "none",
                    fontWeight: isToday ? 700 : 500,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    transition: "all 0.2s ease",
                    "&:hover": !isToday && {
                      transform: "scale(1.05)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      bgcolor: theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.06)",
                    },
                  }}
                >
                  {day && <Typography>{day}</Typography>}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Box>
  );
}
