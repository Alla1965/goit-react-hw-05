import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { searchMovies } from '../../services/tmdbAPI';
import MovieList from '../../components/MovieList/MovieList';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import css from "./MoviesPage.module.css"


const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null); // нове 
  const query = searchParams.get('query') || '';
  const location = useLocation();

   useEffect(() => {
    if (!query) return;

    searchMovies(query)
      .then(({ data }) => {
        if (data.results.length === 0) {
          setError('No movies found. Try another query.');
          setMovies([]); 
        } else {
          setMovies(data.results);
          setError(null);
        }
      })
      .catch(err => {
        setError('Сталася помилка під час пошуку. Спробуйте пізніше.');
        console.error('Error searching movies:', err.message);
        setMovies([]);
      });
  }, [query]);

   const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const inputValue = form.elements.search.value.trim();

    if (inputValue) {
      setSearchParams({ query: inputValue });
    }
  };

  return (
    <div>
      <h1 className={css.titleSearch }>Search Movies</h1>
      <form onSubmit={handleSubmit}  className={css.formSearch}>
        <input
          className={css.inputSearch}
          type="text"
          name="search"
          defaultValue={query}
          placeholder="Enter the movie title..." />
        <button className={ css.btnSearch}type="submit">Search</button>
      </form>

       {error && <NotFoundPage message={error} showHomeLink={false} />}
      {!error && movies.length > 0 && <MovieList movies={movies} />}
     
      {/* {movies.length > 0 && <MovieList movies={movies} />} */}
    </div>
  );
};

export default MoviesPage;
