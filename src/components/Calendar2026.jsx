import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const DAYS = ["D", "L", "M", "M", "J", "V", "S"];

function getCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return cells;
}

export default function Calendar2026() {
  const [month, setMonth] = useState(0);
  const year = 2026;
  const today = new Date();

  const calendar = getCalendar(year, month);

  return (
    <Paper
      elevation={6}
      sx={{
        maxWidth: 420,
        mx: "auto",
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      {/* HEADER ROJO */}
      <Box
        sx={{
          bgcolor: "#c62828",
          color: "#fff",
          p: 3,
        }}
      >
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          {year}
        </Typography>

        <Typography variant="h4" fontWeight={700}>
          {DAYS[today.getDay()]}, {today.getDate()} de{" "}
          {MONTHS[today.getMonth()].slice(0, 3)}.
        </Typography>
      </Box>

      {/* MES */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={2}
        py={1.5}
      >
        <IconButton
          size="small"
          onClick={() => setMonth(m => (m === 0 ? 11 : m - 1))}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Typography fontWeight={600}>
          {MONTHS[month]} {year}
        </Typography>

        <IconButton
          size="small"
          onClick={() => setMonth(m => (m === 11 ? 0 : m + 1))}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* DÍAS */}
      <Grid container px={2}>
        {DAYS.map(d => (
          <Grid item xs={12 / 7} key={d}>
            <Typography
              align="center"
              fontSize={12}
              color="text.secondary"
            >
              {d}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* CALENDARIO */}
      <Grid container px={2} pb={2}>
        {calendar.map((day, i) => {
          const isToday =
            day &&
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day;

          return (
            <Grid item xs={12 / 7} key={i}>
              <Box
                sx={{
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {day && (
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: isToday ? "#c62828" : "transparent",
                      color: isToday ? "#fff" : "text.primary",
                      fontWeight: isToday ? 700 : 400,
                    }}
                  >
                    {day}
                  </Box>
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
        }
