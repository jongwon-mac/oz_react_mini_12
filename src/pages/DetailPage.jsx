import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetail } from '../components/tmdb';
import './DetailPage.css';

function LoadingSpinner() {
  return (
    <div style={{ textAlign: 'center', marginTop: 50, color: 'white' }}>
      <div className="spinner" />
      <p style={{ marginTop: 10 }}>영화 정보를 불러오는 중...</p>
      <style>{`
        .spinner {
          margin: 0 auto;
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function DetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMovieDetail = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMovieDetail(id);
      setMovie(data);
    } catch (err) {
      setError('영화 정보를 불러오는 데 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) getMovieDetail();
  }, [id, getMovieDetail]);

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div style={{ padding: 20, textAlign: 'center', color: 'red', fontSize: 18, marginTop: 50 }}>
        <p>{error}</p>
        <button
          onClick={getMovieDetail}
          style={{
            marginTop: 20,
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: 'bold',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
        >
          다시 시도
        </button>
      </div>
    );

  if (!movie)
    return (
      <div style={{ padding: 20, textAlign: 'center', color: 'white', fontSize: 18, marginTop: 50 }}>
        영화 정보를 찾을 수 없습니다.
      </div>
    );

  const baseUrl = 'https://image.tmdb.org/t/p/w500';
  const posterUrl = movie.poster_path ? `${baseUrl}${movie.poster_path}` : '/images/no-image.png';

  return (
    <div className="detail-page-container">
      <img src={posterUrl} alt={movie.title} />
      <div className="movie-info-text">
        <h2>{movie.title}</h2>
        <p>
          ({movie.original_title}) - {movie.release_date?.slice(0, 4)}
        </p>
        <p>
          <strong>평점:</strong> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} ({movie.vote_count || 0} 표)
        </p>
        <p>
          <strong>개봉일:</strong> {movie.release_date || 'N/A'}
        </p>
        {movie.genres && movie.genres.length > 0 && (
          <p>
            <strong>장르:</strong> {movie.genres.map((genre) => genre.name).join(', ')}
          </p>
        )}
        <p>
          <strong>줄거리:</strong> {movie.overview || '줄거리 정보가 없습니다.'}
        </p>
        {movie.runtime && (
          <p>
            <strong>러닝타임:</strong> {movie.runtime} 분
          </p>
        )}
      </div>
    </div>
  );
}

export default DetailPage;