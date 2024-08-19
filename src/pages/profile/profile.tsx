import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchCurrentUser, updateUserProfile } from '../../slices/userSlice';

export const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.data);
  const userStatus = useSelector((state: RootState) => state.user.status);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchCurrentUser());
    }
  }, [userStatus, dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = () => {
    dispatch(updateUserProfile({ name, email }));
    setEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    setEditing(false);
  };

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!editing}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!editing}
          />
          {editing ? (
            <div>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => setEditing(true)}>Edit</button>
          )}
        </div>
      )}
    </div>
  );
};
