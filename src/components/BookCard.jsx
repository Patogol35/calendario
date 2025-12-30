// src/components/BookCard.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function BookCard({ book, mode }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('book-favorites') || '[]');
    setIsFavorite(favorites.some((fav) => fav.id === book.id));
  }, [book.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('book-favorites') || '[]');
    if (isFavorite) {
      const filtered = favorites.filter((fav) => fav.id !== book.id);
      localStorage.setItem('book-favorites', JSON.stringify(filtered));
    } else {
      favorites.push(book);
      localStorage.setItem('book-favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  const { volumeInfo } = book;
  const title = volumeInfo.title || 'Sin título';
  const authors = volumeInfo.authors?.join(', ') || 'Autor desconocido';
  const description = volumeInfo.description
    ? volumeInfo.description.replace(/<[^>]*>/g, '').substring(0, 160) + '…'
    : 'Sin descripción disponible.';
  const image = volumeInfo.imageLinks?.thumbnail
    ? volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')
    : '';
  const infoLink = volumeInfo.infoLink;

  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
        }}
      >
        <Box position="absolute" top={12} right={12} zIndex={2}>
          <Tooltip title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}>
            <IconButton
              onClick={toggleFavorite}
              color={isFavorite ? 'secondary' : 'default'}
              size="small"
              sx={{
                bgcolor: mode === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(15,23,42,0.85)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                '&:hover': {
                  bgcolor: mode === 'light' ? 'rgba(255,255,255,1)' : 'rgba(15,23,42,0.95)',
                },
              }}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
        </Box>

        <CardMedia
          component="img"
          image={image || 'https://placehold.co/400x600/e2e8f0/64748b?text=No+Cover'}
          alt={title}
          onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x600/e2e8f0/64748b?text=No+Cover')}
          sx={{
            height: 280,
            objectFit: 'cover',
            bgcolor: mode === 'light' ? '#f8fafc' : '#0f172a',
          }}
        />
        <CardContent sx={{ p: 2.5, pt: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                lineHeight: 1.3,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                flex: 1,
                pr: 1,
              }}
            >
              {title}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: mode === 'light' ? '#475569' : '#cbd5e1',
              fontSize: '0.95rem',
              mb: 2,
            }}
          >
            {authors}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: mode === 'light' ? '#334155' : '#cbd5e1',
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.97rem',
              mb: 2.5,
            }}
          >
            {description}
          </Typography>

          {infoLink && (
            <Button
              variant="outlined"
              size="small"
              href={infoLink}
              target="_blank"
              rel="noopener"
              endIcon={<OpenInNewIcon sx={{ fontSize: '1rem' }} />}
              sx={{
                borderColor: mode === 'light' ? '#cbd5e1' : '#334155',
                color: mode === 'light' ? '#475569' : '#cbd5e1',
                fontWeight: 600,
                fontSize: '0.9rem',
                '&:hover': {
                  borderColor: mode === 'light' ? '#94a3b8' : '#64748b',
                  bgcolor: mode === 'light' ? '#f1f5f9' : '#1e293b',
                },
              }}
            >
              Ver en Google Books
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
