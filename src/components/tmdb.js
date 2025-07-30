const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMovieList(query) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('영화 검색 실패');
  return res.json();
}

export async function fetchMovieDetail(id) {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('영화 상세 정보 불러오기 실패');
  return res.json();
}