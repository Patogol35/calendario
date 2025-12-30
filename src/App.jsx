// src/App.jsx
import { useState } from 'react';
import { Container, Typography, Box, Grid, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import { theme } from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';

const API_BASE = 'https://www.googleapis.com/books/v1/volumes';

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_BASE}?q=${encodeURIComponent(query)}&maxResults=24`);
      setBooks(res.data.items || []);
    } catch (err) {
      setError('No pudimos conectar con Google Books. Inténtalo de nuevo.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: 'background.default',
          minHeight: '100vh',
          py: 6,
        }}
      >
        <Container>
          <Box textAlign="center" mb={6}>
            <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '2.8rem' }}>
              📖 BookFinder
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Explora millones de libros con Google Books
            </Typography>
          </Box>

          <SearchBar onSearch={handleSearch} />

          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box display="flex" justifyContent="center" my={8}>
              <CircularProgress size={40} />
            </Box>
          ) : (
            <Grid container spacing={4}>
              {books.map((book) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                  <BookCard book={book} />
                </Grid>
              ))}
            </Grid>
          )}

          {!loading && books.length === 0 && !error && handleSearch && (
            <Typography textAlign="center" color="text.secondary" mt={6}>
              Ingresa un término para buscar libros.
            </Typography>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
