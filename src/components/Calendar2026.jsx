import { Grid, Paper, Typography, Box } from "@mui/material";

const months = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const days = ["L", "M", "X", "J", "V", "S", "D"];

const getMonthDays = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay() || 7;
  const totalDays = new Date(year, month + 1, 0).getDate();
  return { firstDay, totalDays };
};

export default function Calendar2026() {
  return (
    <Box>
      <Typography variant="h4" textAlign="center" mb={4}>
        📅 Calendario 2026
      </Typography>

      <Grid container spacing={3}>
        {months.map((month, index) => {
          const { firstDay, totalDays } = getMonthDays(2026, index);

          return (
            <Grid item xs={12} sm={6} md={4} key={month}>
              <Paper
                elevation={6}
                sx={{
                  p: 2,
                  height: "100%",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Typography variant="h6" textAlign="center" mb={1}>
                  {month}
                </Typography>

                <Grid container spacing={0.5}>
                  {days.map((d) => (
                    <Grid item xs={12 / 7} key={d}>
                      <Typography
                        variant="caption"
                        textAlign="center"
                        display="block"
                        color="primary"
                      >
                        {d}
                      </Typography>
                    </Grid>
                  ))}

                  {[...Array(firstDay - 1)].map((_, i) => (
                    <Grid item xs={12 / 7} key={`empty-${i}`} />
                  ))}

                  {[...Array(totalDays)].map((_, day) => (
                    <Grid item xs={12 / 7} key={day}>
                      <Box
                        sx={{
                          textAlign: "center",
                          py: 0.8,
                          borderRadius: 1,
                          transition: "0.2s",
                          "&:hover": {
                            backgroundColor: "primary.main",
                            color: "#000",
                            cursor: "pointer",
                          },
                        }}
                      >
                        {day + 1}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
