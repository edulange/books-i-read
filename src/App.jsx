import React from 'react';
import Layout from './components/Layout';
import BooksList from './features/books/BooksList';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BooksList />} />
      </Route>
    </Routes>
  );
}

export default App;