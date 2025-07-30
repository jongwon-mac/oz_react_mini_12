import React, { useState, useEffect } from 'react';
import { fetchMovieList } from '../components/tmdb'; // tmdb.js에서 영화 검색 함수 import
import MovieCard from '../components/MovieCard'; // 영화 카드 컴포넌트 import

function MainPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    async function getMovies() {
      setLoading(true);
      setError(null);
      try {
        // 빈 문자열로 호출하면 TMDb에서 기본적으로 인기 영화 검색 결과를 받을 수 있음
        const data = await fetchMovieList('');
        setMovies(data.results || []);
      } catch (err) {
        console.error('영화 목록 불러오기 실패:', err);
        setError('영화 목록을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
    getMovies();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>영화 목록을 불러오는 중...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{error}</div>;
  }

  if (!movies || movies.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>표시할 영화가 없습니다.</div>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center', // 카드들을 중앙 정렬
        padding: '20px',
        gap: '20px', // 카드 간격
      }}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} /> // movie 객체를 MovieCard에 전달
      ))}
    </div>
  );
}

export default MainPage;