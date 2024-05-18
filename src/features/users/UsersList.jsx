import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectAllUsers } from './usersSlice';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const userStatus = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  console.log(users)

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  if (userStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (userStatus === 'failed') {
    return <div>Error: {error}</div>;
  }

  const renderedUsers = users.map((user) => (
    <li key={user.ID}>
      <Link to={`/user/${user.ID}`}>{user.NAME}</Link>
    </li>
  ));

  return (
    <section>
      <h2>Users</h2>
      <ul>{renderedUsers}</ul>
    </section>
  );
};

export default UsersList;
