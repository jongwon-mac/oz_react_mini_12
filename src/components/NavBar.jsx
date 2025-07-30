import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard'; // 같은 폴더에 MovieCard.jsx가 있다고 가정
import { fetchMovieList } from './tmdb'; // 같은 폴더에 tmdb.js가 있다고 가정

// useDebounce 훅: 입력값 지연 처리
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function NavBar() {
  const [query, setQuery] = useState(''); // 검색어 상태
  const debouncedQuery = useDebounce(query, 500); // 0.5초 디바운스 적용
  const [movies, setMovies] = useState([]); // 영화 검색 결과 상태

  useEffect(() => {
    if (!debouncedQuery) {
      setMovies([]); // 검색어 없으면 결과 초기화
      return;
    }

    const fetchMovies = async () => {
      try {
        const data = await fetchMovieList(debouncedQuery); // API 호출
        setMovies(data.results || []);
      } catch (error) {
        console.error('영화 검색 중 오류:', error);
        setMovies([]); // 오류 시 결과 초기화
      }
    };

    fetchMovies();
  }, [debouncedQuery]);

  return (
    <nav
      style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        flexDirection: 'column',
        boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
      }}
    >
      <h1>영화 앱</h1>
      <div style={{ width: '100%', maxWidth: '400px', marginTop: '10px' }}>
        <input
          id="movie-search-input" // 접근성 향상용 id
          name="movie-search" // 접근성 향상용 name
          type="text"
          placeholder="영화 제목 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: 'none' }}
        />
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: 0,
            marginTop: '8px',
            maxHeight: '400px',
            overflowY: 'auto',
            backgroundColor: '#444',
            borderRadius: '4px',
            listStyle: 'none',
          }}
        >
          {movies.length > 0 ? (
            movies.map((movie) => (
              <li key={movie.id} style={{ margin: '5px' }}>
                <MovieCard movie={movie} />
              </li>
            ))
          ) : (
            query && <li style={{ color: '#aaa', textAlign: 'center', width: '100%', padding: '10px' }}>검색 결과가 없습니다.</li>
          )}
        </ul>
      </div>
      <button
        style={{
          marginTop: '10px',
          padding: '6px 12px',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: '#555',
          color: 'white',
        }}
      >
        로그인
      </button>
    </nav>
  );
}