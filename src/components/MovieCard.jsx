import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  if (!movie) return null;

  const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '/images/no-image.png';

  return (
    <Link to={`/detail/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ width: '180px', backgroundColor: '#1a1a1a', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.4)', margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'white', cursor: 'pointer', transition: 'transform 0.2s ease-in-out' }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <img src={imageUrl} alt={movie.title || 'No Title'} style={{ width: '100%', height: '270px', objectFit: 'cover' }} />
        <div style={{ padding: '10px' }}>
          <h3 title={movie.title} style={{ margin: '0 0 5px 0', fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{movie.title || '제목 없음'}</h3>
          <p style={{ margin: '0 0 3px 0', fontSize: '0.85rem', color: '#ccc' }}>개봉: {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}</p>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#ffcc00' }}>⭐ 평점: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;