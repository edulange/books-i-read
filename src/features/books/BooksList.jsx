import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, selectAllBooks, getBooksStatus, getBooksError } from './booksSlice';

const BooksList = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  const booksStatus = useSelector(getBooksStatus);
  const booksError = useSelector(getBooksError);
  console.log('books :>> ', books);

  useEffect(() => {
    if (booksStatus === 'idle') {
      dispatch(fetchBooks());
    }
  }, [booksStatus, dispatch]);

  const renderedBooks = books.map((book) => (
    <article key={book.ID}>
      <h3>{book.TITLE}</h3>
      <p>{book.AUTHOR}</p>
      <p>{book.PAGES}</p>
      <img src={book.THUMBNAIL} alt={book.TITLE} />
    </article>
  ));

  return (
    <section>
      <h2>Books</h2>
      {booksStatus === 'loading' && <div>Loading...</div>}
      {booksStatus === 'failed' && <div>Deu erro no fetch: {booksError}</div>}
      {booksStatus === 'succeeded' && renderedBooks}
    </section>
  );
};

export default BooksList;
