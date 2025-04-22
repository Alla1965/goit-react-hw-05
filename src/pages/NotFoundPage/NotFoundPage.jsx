import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = ({ message = 'Сторінку не знайдено', showHomeLink = true }) => {
  return (
    <div className={css.container}>
      <p>{message}</p>
      {showHomeLink && (
        <Link to="/">
          <button className={css.button}>Повернутися на головну</button>
        </Link>
      )}
    </div>
  );
};

export default NotFoundPage;
